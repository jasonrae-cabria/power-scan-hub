import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react'; // Nagdagdag ako ng Search icon para sa filter
import { useData } from '../context/DataContext';
import { ALL_APPLIANCES } from './AppliancesList';

export default function Calculator({ rate }) {
  const { devices: customDevices } = useData(); // Kunin ang personal devices galing Firebase
  const [calcWattage, setCalcWattage] = useState(100);
  const [calcHoursPerDay, setCalcHoursPerDay] = useState(2);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Pick a saved appliance (optional)");
  const [dropdownSearch, setDropdownSearch] = useState(""); // Para madaling hanapin sa 300+ list

  // PAGSAMAHIN ANG LISTAHAN
  const allDevices = [...customDevices, ...ALL_APPLIANCES];

  const minuteCost = (calcWattage / 1000) * rate / 60;
  const hourCost = (calcWattage / 1000) * rate;
  const dayCost = hourCost * calcHoursPerDay;

  const handleSelect = (device) => {
    setCalcWattage(device.watts);
    setSelectedLabel(`${device.name} — ${device.watts}W`);
    setIsOpen(false);
    setDropdownSearch(""); // Reset search pag nakapili na
  };

  // Filter logic para sa dropdown para hindi ka malunod sa 342 lines
  const filteredInDropdown = allDevices.filter(d => 
    d.name.toLowerCase().includes(dropdownSearch.toLowerCase()) ||
    (d.brand && d.brand.toLowerCase().includes(dropdownSearch.toLowerCase()))
  );

  return (
    <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 md:p-10">
        <p className="text-cyan-300 font-semibold uppercase tracking-[0.4em] mb-3 text-xs md:text-sm">Calculator</p>
        <h2 className="text-2xl md:text-4xl font-black">Wattage and bill estimator</h2>
        <p className="mt-2 md:mt-4 text-slate-400 text-sm md:text-base">Calculate your energy cost per minute, per hour, and per day for any appliance.</p>

        <div className="mt-8 md:mt-10 grid gap-5 sm:grid-cols-2">
          {/* Wattage Input */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-500/80">Device wattage</p>
            <input
              type="number"
              value={calcWattage}
              onChange={(e) => setCalcWattage(Number(e.target.value))}
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500 transition-all"
            />
          </div>

          {/* Hours Input */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-500/80">Hours used per day</p>
            <input
              type="number"
              value={calcHoursPerDay}
              onChange={(e) => setCalcHoursPerDay(Number(e.target.value))}
              min="0"
              step="0.5"
              className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-500 transition-all"
            />
          </div>

          {/* Custom Dropdown Selector */}
          <div className="sm:col-span-2 space-y-2 relative">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-500/80">Select from your devices or library</p>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-left text-white transition-all hover:border-slate-700 active:scale-[0.98]"
            >
              <span className="truncate">{selectedLabel}</span>
              <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute z-50 mt-2 max-h-80 w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#0f172a] shadow-2xl backdrop-blur-xl flex flex-col">
                
                {/* Mini Search sa loob ng Dropdown */}
                <div className="p-2 border-b border-slate-800 bg-slate-900/50 flex items-center gap-2">
                  <Search className="w-4 h-4 text-slate-500 ml-2" />
                  <input 
                    type="text"
                    placeholder="Search appliances..."
                    value={dropdownSearch}
                    onChange={(e) => setDropdownSearch(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-sm py-2 text-white"
                    autoFocus
                  />
                </div>

                <div className="overflow-y-auto flex-1 p-2">
                  {filteredInDropdown.length > 0 ? (
                    filteredInDropdown.map((device) => {
                      const isCustom = device.id.toString().startsWith('custom-');
                      return (
                        <button
                          key={device.id}
                          onClick={() => handleSelect(device)}
                          className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-slate-300 hover:rounded-xl hover:bg-slate-800 hover:text-white transition-colors group"
                        >
                          <span>
                            {device.name} 
                            {isCustom && <span className="ml-2 text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-500/30">Mine</span>}
                          </span>
                          <span className="text-cyan-400 font-bold group-hover:text-cyan-300">{device.watts}W</span>
                        </button>
                      );
                    })
                  ) : (
                    <p className="p-4 text-center text-xs text-slate-500 italic">No matching appliances found.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Estimates Side Panel */}
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 md:p-10">
        <p className="text-cyan-300 font-semibold uppercase tracking-[0.4em] mb-3 text-xs md:text-sm">Estimate</p>
        <div className="space-y-4 md:space-y-5">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 md:p-6 transition-transform hover:scale-[1.02]">
            <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-slate-500">Per minute</p>
            <p className="mt-2 text-2xl md:text-3xl font-black text-white">₱{minuteCost.toFixed(4)}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 md:p-6 transition-transform hover:scale-[1.02]">
            <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-slate-500">Per hour</p>
            <p className="mt-2 text-2xl md:text-3xl font-black text-cyan-400">₱{hourCost.toFixed(2)}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 md:p-6 transition-transform hover:scale-[1.02]">
            <p className="text-[10px] md:text-sm uppercase tracking-[0.3em] text-slate-500">Per day ({calcHoursPerDay}h)</p>
            <p className="mt-2 text-2xl md:text-3xl font-black text-emerald-400">₱{dayCost.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}