import React from 'react';

export default function AboutWeb({ settings }) {
  const isDark = settings.darkMode;

  return (
    <section className="space-y-6 mt-8">
      {/* 4 STEPS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {/* Step 1 */}
        <div className={`rounded-[1.5rem] md:rounded-[2rem] border transition-all p-4 md:p-8 ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-blue-100 bg-white'}`}>
          <p className={`text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.35em] mb-2 md:mb-4 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>Step 1</p>
          <h3 className={`text-sm md:text-2xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Browse Appliances</h3>
          <p className={`mt-2 text-[11px] md:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Choose a device from our list.</p>
        </div>

        {/* Step 2 */}
        <div className={`rounded-[1.5rem] md:rounded-[2rem] border transition-all p-4 md:p-8 ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-blue-100 bg-white'}`}>
          <p className={`text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.35em] mb-2 md:mb-4 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>Step 2</p>
          <h3 className={`text-sm md:text-2xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>View Details</h3>
          <p className={`mt-2 text-[11px] md:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>See wattage and cost estimations.</p>
        </div>

        {/* Step 3 */}
        <div className={`rounded-[1.5rem] md:rounded-[2rem] border transition-all p-4 md:p-8 ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-blue-100 bg-white'}`}>
          <p className={`text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.35em] mb-2 md:mb-4 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>Step 3</p>
          <h3 className={`text-sm md:text-2xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Download QR</h3>
          <p className={`mt-2 text-[11px] md:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Generate and save your device QR.</p>
        </div>

        {/* Step 4 */}
        <div className={`rounded-[1.5rem] md:rounded-[2rem] border transition-all p-4 md:p-8 ${isDark ? 'border-slate-800 bg-slate-900/70' : 'border-blue-100 bg-white'}`}>
          <p className={`text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.35em] mb-2 md:mb-4 ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>Step 4</p>
          <h3 className={`text-sm md:text-2xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Track Usage</h3>
          <p className={`mt-2 text-[11px] md:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Log usage for monthly estimates.</p>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className={`rounded-[2rem] md:rounded-[2.5rem] border transition-all p-6 md:p-12 shadow-2xl backdrop-blur-xl ${isDark ? 'border-white/10 bg-gradient-to-br from-slate-950/90 via-slate-900/70 to-slate-950/80' : 'border-blue-100 bg-white'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-xl md:text-3xl font-black mb-4 md:mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>About Smart Outlet</h2>
          <p className={`text-sm md:text-lg leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Smart Outlet helps Filipinos manage electricity expenses with real-time cost estimations and QR integration. Optimize your energy consumption with our database of over 300 devices.
          </p>
        </div>
      </div>
    </section>
  );
}