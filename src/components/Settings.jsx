import React from 'react';
import { useData } from '../context/DataContext';

export default function Settings({ settings, setSettings }) {
  const { saveData } = useData();

  const handleUpdate = (updatedSettings) => {
    setSettings(updatedSettings);
    saveData({ settings: updatedSettings });
  };

  return (
    /* Dinagdagan ko ng pb-24 dito para hindi matakpan ng badge ang footer text */
    <section className="space-y-8 pb-6"> 
      {/* Header Section */}
      <div className={`rounded-[2.5rem] border transition-all p-10 shadow-2xl backdrop-blur-xl ${
        settings.darkMode
          ? 'border-white/10 bg-slate-950/70'
          : 'border-blue-100 bg-white'
      }`}>
        <p className={`font-semibold uppercase tracking-[0.4em] mb-3 ${
          settings.darkMode ? 'text-cyan-300' : 'text-blue-600'
        }`}>Settings</p>
        <h2 className={`text-4xl font-black ${
          settings.darkMode ? 'text-white' : 'text-slate-900'
        }`}>Customize your smart home experience</h2>
        <p className={`mt-4 max-w-2xl ${
          settings.darkMode ? 'text-slate-400' : 'text-slate-600'
        }`}>Change your billing rate, app theme preferences, and remote behavior instantly.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* User Profile Section */}
        <div className={`rounded-[2rem] border transition-all ${
          settings.darkMode
            ? 'border-slate-800 bg-slate-900/70'
            : 'border-blue-100 bg-white'
        } p-8`}>
          <h3 className={`text-2xl font-bold ${
            settings.darkMode ? 'text-white' : 'text-slate-900'
          }`}>User Profile</h3>
          <div className="mt-6 space-y-5">
            <label className={`block text-sm font-semibold ${
              settings.darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Full Name
              <input
                type="text"
                value={settings.userName}
                onChange={(event) => handleUpdate({ ...settings, userName: event.target.value })}
                placeholder="Rae Debo"
                className={`mt-2 w-full rounded-3xl border px-4 py-3 outline-none focus:ring-2 transition ${
                  settings.darkMode
                    ? 'border-slate-800 bg-slate-950 text-white focus:border-cyan-500 focus:ring-cyan-500/20'
                    : 'border-blue-100 bg-white text-slate-900 focus:border-blue-400 focus:ring-blue-400/20'
                }`}
              />
            </label>
            <label className={`block text-sm font-semibold ${
              settings.darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Age
              <input
                type="number"
                value={settings.userAge}
                onChange={(event) => handleUpdate({ ...settings, userAge: event.target.value })}
                placeholder="20"
                className={`mt-2 w-full rounded-3xl border px-4 py-3 outline-none focus:ring-2 transition ${
                  settings.darkMode
                    ? 'border-slate-800 bg-slate-950 text-white focus:border-cyan-500 focus:ring-cyan-500/20'
                    : 'border-blue-100 bg-white text-slate-900 focus:border-blue-400 focus:ring-blue-400/20'
                }`}
              />
            </label>
            <label className={`block text-sm font-semibold ${
              settings.darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Address
              <textarea
                value={settings.userAddress}
                onChange={(event) => handleUpdate({ ...settings, userAddress: event.target.value })}
                placeholder="123 Main Street, Manila, Philippines"
                rows="3"
                className={`mt-2 w-full rounded-3xl border px-4 py-3 outline-none focus:ring-2 transition resize-none ${
                  settings.darkMode
                    ? 'border-slate-800 bg-slate-950 text-white focus:border-cyan-500 focus:ring-cyan-500/20'
                    : 'border-blue-100 bg-white text-slate-900 focus:border-blue-400 focus:ring-blue-400/20'
                }`}
              />
            </label>
          </div>
        </div>

        {/* App Preferences Section */}
        <div className={`rounded-[2rem] border transition-all ${
          settings.darkMode
            ? 'border-slate-800 bg-slate-900/70'
            : 'border-blue-100 bg-white'
        } p-8`}>
          <h3 className={`text-2xl font-bold ${
            settings.darkMode ? 'text-white' : 'text-slate-900'
          }`}>App Preferences</h3>
          <div className="mt-6 space-y-5">
            <div className={`flex items-center justify-between gap-4 rounded-3xl border px-5 py-4 transition ${
              settings.darkMode
                ? 'border-slate-800 bg-slate-950/80 hover:bg-slate-950'
                : 'border-blue-100 bg-blue-50/50 hover:bg-blue-50'
            }`}>
              <span className={`text-sm font-medium ${
                settings.darkMode ? 'text-slate-200' : 'text-slate-700'
              }`}>Dark Mode</span>
              <button
                type="button"
                onClick={() => handleUpdate({ ...settings, darkMode: !settings.darkMode })}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                  settings.darkMode ? 'bg-cyan-500' : 'bg-blue-400'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                  settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            <div className={`flex items-center justify-between gap-4 rounded-3xl border px-5 py-4 transition ${
              settings.darkMode
                ? 'border-slate-800 bg-slate-950/80 hover:bg-slate-950'
                : 'border-blue-100 bg-blue-50/50 hover:bg-blue-50'
            }`}>
              <span className={`text-sm font-medium ${
                settings.darkMode ? 'text-slate-200' : 'text-slate-700'
              }`}>Notifications</span>
              <button
                type="button"
                onClick={() => handleUpdate({ ...settings, notifications: !settings.notifications })}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                  settings.notifications ? 'bg-cyan-500' : 'bg-blue-400'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                  settings.notifications ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
            <div className={`flex items-center justify-between gap-4 rounded-3xl border px-5 py-4 transition ${
              settings.darkMode
                ? 'border-slate-800 bg-slate-950/80 hover:bg-slate-950'
                : 'border-blue-100 bg-blue-50/50 hover:bg-blue-50'
            }`}>
              <span className={`text-sm font-medium ${
                settings.darkMode ? 'text-slate-200' : 'text-slate-700'
              }`}>Auto Schedule Reminders</span>
              <button
                type="button"
                onClick={() => handleUpdate({ ...settings, autoSchedule: !settings.autoSchedule })}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                  settings.autoSchedule ? 'bg-cyan-500' : 'bg-blue-400'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                  settings.autoSchedule ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Billing Settings Section */}
        <div className={`rounded-[2rem] border transition-all lg:col-span-full lg:w-1/2 lg:mx-auto ${
          settings.darkMode
            ? 'border-slate-800 bg-slate-900/70'
            : 'border-blue-100 bg-white'
        } p-8`}>
          <h3 className={`text-2xl font-bold ${
            settings.darkMode ? 'text-white' : 'text-slate-900'
          }`}>Billing Settings</h3>
          <div className="mt-6 space-y-5">
            <label className={`block text-sm font-semibold ${
              settings.darkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Meralco rate (₱/kWh)
              <input
                type="number"
                min="0"
                step="0.01"
                value={settings.meralcoRate}
                onChange={(event) => handleUpdate({ ...settings, meralcoRate: Number(event.target.value) })}
                className={`mt-2 w-full rounded-3xl border px-4 py-3 outline-none focus:ring-2 transition ${
                  settings.darkMode
                    ? 'border-slate-800 bg-slate-950 text-white focus:border-cyan-500 focus:ring-cyan-500/20'
                    : 'border-blue-100 bg-white text-slate-900 focus:border-blue-400 focus:ring-blue-400/20'
                }`}
              />
            </label>
          </div>
        </div>
      </div>
      
      {/* Nilagyan ko ng mt-8 para mas may gap pa */}
      <p className="text-center text-xs text-slate-600 mt-8">All changes are auto-saved to Firebase Cloud.</p>
    </section>
  );
}