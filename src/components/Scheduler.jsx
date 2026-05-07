import { useState, useEffect } from 'react';
import { ChevronDown, Trash2, Plus, Search } from 'lucide-react';
import { useData } from '../context/DataContext';
import { ALL_APPLIANCES } from './AppliancesList';

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Scheduler({ rate }) {
  const { devices: customDevices, scheduleEntries, setScheduleEntries, saveData } = useData();
  
  const allDevices = [...customDevices, ...ALL_APPLIANCES];

  const [scheduleMonth, setScheduleMonth] = useState(new Date());
  const [selectedScheduleDate, setSelectedScheduleDate] = useState(new Date().toISOString().slice(0, 10));
  const [scheduleDeviceId, setScheduleDeviceId] = useState("");
  const [scheduleMinutes, setScheduleMinutes] = useState(30);
  const [showEntryPanel, setShowEntryPanel] = useState(false);
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState("");


  useEffect(() => {
    if (!scheduleDeviceId && allDevices.length > 0) {
      setScheduleDeviceId(allDevices[0].id);
    }
  }, [allDevices, scheduleDeviceId]);

  const selectedDevice = allDevices.find((d) => d.id === scheduleDeviceId) || allDevices[0];

  const getMonthDays = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return [
      ...Array.from({ length: firstDay }, () => null),
      ...Array.from({ length: daysInMonth }, (_, index) => {
        const date = new Date(year, month, index + 1);
        return {
          day: index + 1,
          iso: date.toISOString().slice(0, 10),
          label: date.toLocaleDateString(undefined, { weekday: 'short' }),
        };
      }),
    ];
  };

  const scheduleYear = scheduleMonth.getFullYear();
  const scheduleMonthIndex = scheduleMonth.getMonth();
  const scheduleMonthLabel = scheduleMonth.toLocaleString(undefined, { month: 'long', year: 'numeric' });
  const monthDays = getMonthDays(scheduleYear, scheduleMonthIndex);
  const monthKey = `${scheduleYear}-${String(scheduleMonthIndex + 1).padStart(2, '0')}`;
  
  const monthlyEntries = Object.entries(scheduleEntries).filter(([date]) => date.startsWith(monthKey));
  const monthlyBill = monthlyEntries.reduce((sum, [, entries]) => {
    return sum + entries.reduce((daySum, entry) => daySum + ((entry.watts / 1000) * rate * (entry.minutes / 60)), 0);
  }, 0);

  const selectedDayEntries = scheduleEntries[selectedScheduleDate] || [];
  const selectedDayPreview = selectedDayEntries.slice(0, 2);

  const filteredInDropdown = allDevices.filter(d => 
    d.name.toLowerCase().includes(dropdownSearch.toLowerCase())
  );

  const handleRemoveEntry = (entryId) => {
    const currentDay = scheduleEntries[selectedScheduleDate] ?? [];
    const updatedDay = currentDay.filter((entry) => entry.id !== entryId);
    
    let newEntries;
    if (updatedDay.length === 0) {
      const { [selectedScheduleDate]: removed, ...rest } = scheduleEntries;
      newEntries = rest;
    } else {
      newEntries = { ...scheduleEntries, [selectedScheduleDate]: updatedDay };
    }

    setScheduleEntries(newEntries);
    saveData({ scheduleEntries: newEntries });
  };

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!selectedDevice) return;
    const entry = {
      id: `entry-${Date.now()}`,
      deviceId: selectedDevice.id,
      name: selectedDevice.name,
      watts: selectedDevice.watts,
      minutes: scheduleMinutes,
    };

    const currentDay = scheduleEntries[selectedScheduleDate] ?? [];
    const newEntries = { ...scheduleEntries, [selectedScheduleDate]: [...currentDay, entry] };
    
    setScheduleEntries(newEntries);
    saveData({ scheduleEntries: newEntries });
    setScheduleMinutes(30);
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-cyan-300 font-semibold uppercase tracking-[0.4em] mb-2 text-xs md:text-sm">Scheduler</p>
            <h2 className="text-2xl md:text-3xl font-black">Usage Tracking</h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                const next = new Date(scheduleYear, scheduleMonthIndex - 1, 1);
                setScheduleMonth(next);
                setSelectedScheduleDate(next.toISOString().slice(0, 10));
              }}
              className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => {
                const next = new Date(scheduleYear, scheduleMonthIndex + 1, 1);
                setScheduleMonth(next);
                setSelectedScheduleDate(next.toISOString().slice(0, 10));
              }}
              className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              Next
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-7 gap-2 text-center text-[10px] md:text-xs uppercase tracking-[0.25em]">
          {DAYS.map((label) => (
            <div key={label} className="rounded-2xl py-3 font-bold text-slate-500">{label}</div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1 md:gap-3">
          {monthDays.map((cell, index) => (
            cell ? (
              <button
                key={cell.iso}
                type="button"
                onClick={() => setSelectedScheduleDate(cell.iso)}
                className={`group relative rounded-2xl md:rounded-[2rem] p-3 md:p-5 flex flex-col items-center justify-center transition-all ${
                  selectedScheduleDate === cell.iso 
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20 scale-105' 
                  : 'bg-slate-950/40 border border-slate-800/50 text-slate-400 hover:border-cyan-500/50 hover:text-white'
                }`}
              >
                <div className="text-sm md:text-lg">{cell.day}</div>
                { (scheduleEntries[cell.iso]?.length > 0) && (
                  <div className={`mt-1 h-1 w-1 rounded-full ${selectedScheduleDate === cell.iso ? 'bg-slate-900' : 'bg-cyan-400'}`} />
                )}
              </button>
            ) : (
              <div key={`blank-${index}`} className="p-3 md:p-5" />
            )
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 md:p-8">
          <div className="mb-6">
            <p className="text-cyan-300 uppercase tracking-[0.4em] text-[10px] font-bold">{scheduleMonthLabel}</p>
            <h3 className="mt-2 text-2xl font-black text-white">{selectedScheduleDate}</h3>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-emerald-500/10 px-4 py-3 border border-emerald-500/20">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Monthly Bill</span>
              <span className="text-xl font-black text-emerald-400">₱{monthlyBill.toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={handleAddEntry} className="space-y-5">
            <div className="space-y-2 relative">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Select Appliance</p>
              <button 
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex w-full items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-left text-sm text-white outline-none focus:border-cyan-500 transition-all"
              >
                <span className="truncate">
                  {selectedDevice ? `${selectedDevice.name} — ${selectedDevice.watts}W` : "Choose device"}
                </span>
                <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute z-50 mt-2 max-h-80 w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] shadow-2xl backdrop-blur-xl flex flex-col">
                  <div className="p-2 border-b border-slate-800 bg-slate-900/50 flex items-center gap-2">
                    <Search className="w-4 h-4 text-slate-500 ml-2" />
                    <input 
                      type="text"
                      placeholder="Search appliance..."
                      value={dropdownSearch}
                      onChange={(e) => setDropdownSearch(e.target.value)}
                      className="w-full bg-transparent border-none outline-none text-sm py-2 text-white"
                      autoFocus
                    />
                  </div>
                  <div className="overflow-y-auto flex-1 p-2">
                    {filteredInDropdown.map((device) => {
                      const isCustom = device.id.toString().startsWith('custom-');
                      return (
                        <button
                          key={device.id}
                          type="button"
                          onClick={() => {
                            setScheduleDeviceId(device.id);
                            setIsDropdownOpen(false);
                            setDropdownSearch("");
                          }}
                          className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-slate-300 hover:rounded-xl hover:bg-slate-800 hover:text-white transition-colors group"
                        >
                          <span>
                            {device.name}
                            {isCustom && <span className="ml-2 text-[8px] bg-cyan-500/20 text-cyan-400 px-1.5 py-0.5 rounded-full border border-cyan-500/30">Mine</span>}
                          </span>
                          <span className="ml-1 text-cyan-400 font-bold">{device.watts}W</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Duration (Minutes)</p>
              <input
                type="number"
                min="1"
                value={scheduleMinutes}
                onChange={(e) => setScheduleMinutes(Number(e.target.value))}
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500 transition-all"
              />
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-6 py-4 text-sm font-black text-slate-950 hover:bg-cyan-400 transition-all active:scale-95"
            >
              <Plus className="h-4 w-4" /> ADD USAGE ENTRY
            </button>
          </form>

          <div className="mt-10 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Entries for today</h4>
            {selectedDayEntries.length ? (
              <>
                {selectedDayPreview.map((entry) => (
                  <div key={entry.id} className="group relative rounded-2xl border border-slate-800 bg-slate-950/50 p-4 transition-all hover:bg-slate-800/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-white">{entry.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">{entry.watts}W • {entry.minutes} MINS</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black text-cyan-400">₱{((entry.watts / 1000) * rate * (entry.minutes / 60)).toFixed(2)}</p>
                        <button
                          onClick={() => handleRemoveEntry(entry.id)}
                          className="mt-1 text-[10px] font-bold text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {selectedDayEntries.length > 2 && (
                  <button
                    onClick={() => setShowEntryPanel(true)}
                    className="w-full py-2 text-[10px] font-black text-cyan-500 uppercase tracking-widest hover:text-cyan-300"
                  >
                    + View {selectedDayEntries.length - 2} more entries
                  </button>
                )}
              </>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-800 p-6 text-center">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest">No entries yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showEntryPanel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="w-full max-w-2xl rounded-[2.5rem] border border-slate-800 bg-slate-900 p-6 md:p-10 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em]">Full Log</p>
                <h3 className="text-2xl font-black text-white">{selectedScheduleDate}</h3>
              </div>
              <button 
                onClick={() => setShowEntryPanel(false)}
                className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700"
              >
                CLOSE
              </button>
            </div>
            <div className="max-h-[50vh] space-y-3 overflow-y-auto pr-2 custom-scrollbar">
              {selectedDayEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <div>
                    <p className="font-bold text-white">{entry.name}</p>
                    <p className="text-xs text-slate-500 font-bold tracking-widest">{entry.watts}W • {entry.minutes} MINS</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-black text-emerald-400">₱{((entry.watts / 1000) * rate * (entry.minutes / 60)).toFixed(2)}</p>
                    <button onClick={() => handleRemoveEntry(entry.id)} className="text-rose-500 hover:scale-110 transition-transform">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

