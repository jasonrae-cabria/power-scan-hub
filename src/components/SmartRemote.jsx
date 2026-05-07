import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Circle } from 'lucide-react';

const TV_BRANDS = ["Samsung", "LG", "Sony", "Redmi", "TCL", "Hisense", "Vizio", "Philips", "Panasonic", "Sharp"];

export default function SmartRemote() {
  const [tvBrand, setTvBrand] = useState("Samsung");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tvPower, setTvPower] = useState(false);
  const [tvVolume, setTvVolume] = useState(18);
  const [tvMuted, setTvMuted] = useState(false);
  const [tvInput, setTvInput] = useState("HDMI 1");
  const [tvAction, setTvAction] = useState("Ready");

  const tvDisplay = tvPower ? `Connected • ${tvInput}` : "Powered Off";
  const tvVolumeLabel = tvMuted ? 'Muted' : `${tvVolume}%`;

  const sendCommand = (command) => {
    setTvAction(command);
    console.log(`Sending ${command} to ${tvBrand} TV at IP: 192.168.x.x`);
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[1fr_400px] max-w-6xl mx-auto">
      {/* Left Panel: Status & Brand */}
      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 flex flex-col justify-between">
        <div>
          <p className="text-cyan-300 font-semibold uppercase tracking-[0.4em] text-xs mb-2">Remote Control</p>
          <h2 className="text-3xl font-black">Smart System</h2>
          <p className="mt-4 text-slate-400 text-sm leading-relaxed">
            Control your devices via local network IP. Select your TV brand to sync protocols.
          </p>
          
          {/* Brand Selection */}
          <div className="mt-6 inline-block relative">
            <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 ml-1">Device Brand</p>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-all"
            >
              <span>{tvBrand}</span>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                {TV_BRANDS.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => { setTvBrand(brand); setIsDropdownOpen(false); }}
                    className="w-full px-4 py-2.5 text-left text-sm text-slate-300 hover:bg-cyan-500 hover:text-black transition-colors"
                  >
                    {brand}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Display Screen */}
        <div className="mt-8 rounded-[1.5rem] border border-slate-800 bg-black/60 p-5 shadow-inner">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-cyan-500/70 font-bold">{tvBrand} Display</p>
              <p className="text-xl font-bold text-slate-100 mt-1">{tvDisplay}</p>
              <p className="text-xs text-slate-500 mt-1">{tvPower ? `Volume: ${tvVolumeLabel}` : 'Device is offline'}</p>
            </div>
            <div className="px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-[10px] font-bold text-cyan-400">
              {tvAction.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Physical Remote Layout */}
      <div className="rounded-[2.5rem] border border-slate-800 bg-slate-900/70 p-8 shadow-2xl">
        <div className="flex flex-col items-center gap-8">
          
          {/* Power & Mute - Equal Row */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <button
              onClick={() => { setTvPower(!tvPower); sendCommand(tvPower ? 'Power Off' : 'Power On'); }}
              className={`rounded-2xl py-4 text-xs font-black transition-all ${tvPower ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-slate-800 text-slate-400'}`}
            >
              POWER
            </button>
            <button
              disabled={!tvPower}
              onClick={() => { setTvMuted(!tvMuted); sendCommand(tvMuted ? 'Unmute' : 'Mute'); }}
              className="rounded-2xl bg-slate-800 py-4 text-xs font-black text-slate-200 hover:bg-slate-700 disabled:opacity-30"
            >
              {tvMuted ? 'UNMUTE' : 'MUTE'}
            </button>
          </div>

          {/* D-Pad (Directional Buttons) */}
          <div className="relative bg-slate-950/50 p-4 rounded-full border border-slate-800 shadow-inner">
            <div className="grid grid-cols-3 grid-rows-3 gap-2">
              <div />
              <button disabled={!tvPower} onClick={() => sendCommand('Up')} className="p-4 rounded-xl hover:bg-slate-800 text-slate-400 flex justify-center disabled:opacity-30"><ChevronUp /></button>
              <div />
              
              <button disabled={!tvPower} onClick={() => sendCommand('Left')} className="p-4 rounded-xl hover:bg-slate-800 text-slate-400 flex justify-center disabled:opacity-30"><ChevronLeft /></button>
              <button 
                disabled={!tvPower} 
                onClick={() => sendCommand('OK')} 
                className="bg-cyan-500 rounded-full h-14 w-14 flex items-center justify-center text-slate-950 font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-30"
              >
                OK
              </button>
              <button disabled={!tvPower} onClick={() => sendCommand('Right')} className="p-4 rounded-xl hover:bg-slate-800 text-slate-400 flex justify-center disabled:opacity-30"><ChevronRight /></button>
              
              <div />
              <button disabled={!tvPower} onClick={() => sendCommand('Down')} className="p-4 rounded-xl hover:bg-slate-800 text-slate-400 flex justify-center disabled:opacity-30"><ChevronDown /></button>
              <div />
            </div>
          </div>

          {/* Volume & Input */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-2">
              <button
                disabled={!tvPower}
                onClick={() => { setTvVolume(v => Math.min(100, v + 5)); sendCommand('Vol +'); }}
                className="rounded-2xl bg-slate-800 py-3 hover:bg-slate-700 text-slate-200 disabled:opacity-30"
              >
                VOL +
              </button>
              <button
                disabled={!tvPower}
                onClick={() => { setTvVolume(v => Math.max(0, v - 5)); sendCommand('Vol -'); }}
                className="rounded-2xl bg-slate-800 py-3 hover:bg-slate-700 text-slate-200 disabled:opacity-30"
              >
                VOL -
              </button>
            </div>
            <button
              disabled={!tvPower}
              onClick={() => {
                const next = tvInput === 'HDMI 1' ? 'HDMI 2' : 'HDMI 1';
                setTvInput(next);
                sendCommand(`Input: ${next}`);
              }}
              className="h-full rounded-2xl border-2 border-slate-800 bg-transparent py-3 text-xs font-bold text-slate-400 hover:border-cyan-500/50 hover:text-cyan-500 transition-all disabled:opacity-30"
            >
              SOURCE<br/>INPUT
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}