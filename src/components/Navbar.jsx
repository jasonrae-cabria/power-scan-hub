import { Home, Zap, Calculator, Calendar, Smartphone, Settings } from 'lucide-react';

const TABS = ["HOME", "APPLIANCES", "CALCULATOR", "SCHEDULER", "REMOTE", "SETTINGS"];

const TAB_ICONS = {
  HOME: Home,
  APPLIANCES: Zap,
  CALCULATOR: Calculator,
  SCHEDULER: Calendar,
  REMOTE: Smartphone,
  SETTINGS: Settings,
};

export default function Navbar({ currentTab, setCurrentTab }) {
  return (
    <>
      <div className="hidden md:block fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#071b3b]/90 backdrop-blur-2xl shadow-2xl shadow-cyan-900/30">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-bold text-white shadow-[0_25px_50px_-38px_rgba(15,23,42,0.8)] backdrop-blur-xl">Smart Outlet</div>
          </div>

          <nav className="flex flex-wrap items-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setCurrentTab(tab)}
                className={`rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 shadow-[0_10px_30px_-18px_rgba(14,165,233,0.7)] transition backdrop-blur-xl ${currentTab === tab ? 'bg-white/15 text-white shadow-lg shadow-cyan-500/25' : 'hover:bg-white/10'}`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="md:hidden fixed top-4 left-1/2 -translate-x-1/2 z-40 flex w-[90%] max-w-[400px] items-center justify-around gap-2 rounded-full border border-cyan-500/20 bg-slate-900/60 px-3 py-1.5 shadow-2xl shadow-cyan-900/35 backdrop-blur-lg">
        {TABS.map((tab) => {
          const Icon = TAB_ICONS[tab];
          const active = currentTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => setCurrentTab(tab)}
              aria-label={tab}
              className={`flex h-14 w-14 items-center justify-center rounded-3xl transition ${active ? 'bg-cyan-500/20 text-cyan-200 shadow-lg shadow-cyan-500/25 ring-1 ring-cyan-400/30' : 'text-slate-300 hover:bg-white/10'}`}
            >
              <Icon className={`w-6 h-6 ${active ? 'text-cyan-300' : 'text-slate-300'}`} />
              <span className="sr-only">{tab}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
