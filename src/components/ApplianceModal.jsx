import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function ApplianceModal({ selectedApp, setSelectedApp, rate }) {
  const qrRef = useRef(null);

  const downloadQr = () => {
    if (!qrRef.current || !selectedApp) return;
    const svg = qrRef.current.querySelector('svg');
    if (!svg) return;

    const svgString = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedApp.name.replace(/\s+/g, '_')}_qr.svg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  if (!selectedApp) return null;

  // SMART LOGIC: Typical Daily Usage based on Category
  const getTypicalHours = (category) => {
    const cat = category?.toUpperCase() || "";
    if (cat.includes("KITCHEN") || cat.includes("COOKING")) return 0.5; // 30 mins
    if (cat.includes("COOLING") || cat.includes("FAN")) return 12;      // 12 hours
    if (cat.includes("ENTERTAINMENT") || cat.includes("TV")) return 4;  // 4 hours
    return 1; // Default 1 hour for others
  };

  const dailyHours = getTypicalHours(selectedApp.category);
  const monthlyCost = (selectedApp.watts / 1000) * rate * dailyHours * 30;

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-2 md:p-4">
      {/* Reduced padding and max-height for mobile optimization */}
      <div className="bg-[#0b1220] border border-slate-800 w-full max-w-2xl rounded-[2rem] md:rounded-[2.5rem] p-4 md:p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200 max-h-[95vh] overflow-y-auto md:overflow-visible">
        
        <button onClick={() => setSelectedApp(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl md:text-2xl font-bold z-10">✕</button>

        {/* Header Section: Scaled down for mobile */}
        <div className="flex flex-col gap-2 mb-3 md:mb-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-cyan-500 rounded-2xl md:rounded-3xl flex items-center justify-center text-slate-950 text-xl md:text-3xl font-black">⚡</div>
            <div className="overflow-hidden">
              <h2 className="text-xl md:text-3xl font-black leading-tight truncate">{selectedApp.name}</h2>
              <p className="text-slate-400 font-semibold text-[10px] md:text-xs uppercase tracking-[0.2em]">{selectedApp.brand} • {selectedApp.category}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-cyan-500/20 bg-slate-950/70 px-3 py-2 text-[10px] md:text-xs text-center text-slate-400">
            Click Download to save the QR and share cost details instantly.
          </div>
        </div>

        {/* Description: More compact on mobile */}
        <p className="text-slate-400 text-[10px] md:text-sm leading-tight md:leading-relaxed mb-3 md:mb-6 bg-slate-900/60 p-3 rounded-2xl border border-slate-800 line-clamp-2 md:line-clamp-none">
          {selectedApp.description}
        </p>

        {/* Main Stats Grid: Reduced vertical padding */}
        <div className="grid grid-cols-3 gap-2 mb-3 md:mb-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 py-1.5 md:py-4 px-1 text-center">
            <p className="text-[8px] md:text-[10px] uppercase tracking-tighter md:tracking-[0.35em] text-slate-500 mb-1">Wattage</p>
            <p className="text-lg md:text-3xl font-black text-white">{selectedApp.watts}W</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 py-1.5 md:py-4 px-1 text-center">
            <p className="text-[8px] md:text-[10px] uppercase tracking-tighter md:tracking-[0.35em] text-slate-500 mb-1">Per Hour</p>
            <p className="text-lg md:text-3xl font-black text-cyan-400">₱{((selectedApp.watts/1000) * rate).toFixed(2)}</p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 py-1.5 md:py-4 px-1 text-center">
            <p className="text-[8px] md:text-[10px] uppercase tracking-tighter md:tracking-[0.35em] text-slate-500 mb-1">Per Minute</p>
            <p className="text-lg md:text-3xl font-black text-blue-300">₱{((selectedApp.watts/1000) * rate / 60).toFixed(4)}</p>
          </div>
        </div>

        {/* QR and Estimate Section */}
        <div className="grid gap-3 md:gap-6 md:grid-cols-[auto_1fr] items-center">
          <div ref={qrRef} className="mx-auto rounded-3xl bg-white p-2 md:p-4 shadow-2xl shadow-cyan-500/15">
            {/* Reduced size for mobile to save space */}
            <QRCodeSVG 
              value={JSON.stringify({
                name: selectedApp.name, 
                watts: selectedApp.watts, 
                costPerHour: `₱${((selectedApp.watts/1000) * rate).toFixed(2)}`,
                category: selectedApp.category
              })} 
              size={120} 
              className="md:w-[180px] md:h-[180px]"
            />
          </div>
          
          <div className="space-y-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3 md:p-5 text-center md:text-left">
              <p className="text-[9px] md:text-xs uppercase tracking-[0.15em] text-slate-500 mb-1">
                Estimated Monthly Cost ({dailyHours}h/day)
              </p>
              <p className="text-2xl md:text-4xl font-black text-white">
                ₱{monthlyCost.toLocaleString(undefined, {minimumFractionDigits: 2})}
              </p>
            </div>
            <button
              type="button"
              onClick={downloadQr}
              className="w-full rounded-2xl bg-cyan-500 py-3 md:py-4 text-[10px] md:text-sm font-black uppercase tracking-[0.2em] text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transition"
            >
              Download QR Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}