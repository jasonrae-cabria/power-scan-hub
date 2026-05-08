import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import ApplianceGrid from './components/ApplianceGrid'
import ApplianceModal from './components/ApplianceModal'
import { ALL_APPLIANCES } from './components/AppliancesList';
import Calculator from './components/Calculator'
import Scheduler from './components/Scheduler'
import SmartRemote from './components/SmartRemote'
import Settings from './components/Settings'
import MeralcoBadge from './components/MeralcoBadge'
import TipSlider from './components/TipSlider';
import { Zap } from 'lucide-react';
import { useData } from './context/DataContext';
import AboutWeb from './components/AboutWeb';
import SplashScreen from './components/SplashScreen';
import ConnectivityStatus from './components/ConnectivityStatus';

export default function App() {
  const [currentTab, setCurrentTab] = useState("HOME");
  const [selectedApp, setSelectedApp] = useState(null);
  const [devices, setDevices] = useState(ALL_APPLIANCES);
  const [showSplash, setShowSplash] = useState(true);
  
  const [scannedApp, setScannedApp] = useState(null);
  
  const { settings, setSettings } = useData();
  const rate = settings.meralcoRate;

  useEffect(() => {
    const isCleanPath = window.location.pathname.includes('/scan');
    const isHashPath = window.location.hash.includes('/scan');
    
    if (isCleanPath || isHashPath) {
      const queryString = isHashPath 
        ? window.location.hash.split('?')[1] 
        : window.location.search;
        
      const params = new URLSearchParams(queryString);
      
      if (params.get('name')) {
        const appData = {
          name: params.get('name'),
          brand: params.get('brand') || "Generic",
          watts: parseFloat(params.get('watts')) || 0,
          category: params.get('cat') || "General",
          description: params.get('desc') || "",
          isScanned: true 
        };
        setScannedApp(appData);
        setCurrentTab("SCAN_RESULT"); 
      }
    }
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <>
      <ConnectivityStatus />
      <div className={`min-h-screen animate-in fade-in duration-700 ${settings.darkMode ? 'bg-[#020617] text-white' : 'bg-white text-slate-950'} px-4 py-8 md:px-8 text-sm md:text-base font-sans`}>
        
        {currentTab !== "SCAN_RESULT" && (
          <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
        )}

        <div className={currentTab === "SCAN_RESULT" ? "pt-4" : "pt-16 md:pt-32 max-w-7xl mx-auto pb-0 md:pb-20"}>
          
          {/* SCAN RESULT VIEW */}
          {currentTab === 'SCAN_RESULT' && scannedApp && (
            <div className="flex flex-col items-center justify-center min-h-[80vh] animate-in zoom-in duration-300">
              <ApplianceModal 
                selectedApp={scannedApp} 
                setSelectedApp={(val) => {
                  if (!val) {
                    window.location.href = window.location.origin;
                  }
                }} 
                rate={rate} 
              />
              <button 
                onClick={() => window.location.href = window.location.origin}
                className="mt-8 px-6 py-2 rounded-full bg-slate-800 text-white text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors"
              >
                Go to Main Dashboard
              </button>
            </div>
          )}

          {currentTab === 'HOME' && (
            <section className="space-y-8">
              <div className={`rounded-[2.5rem] border px-4 py-8 md:px-12 md:py-12 shadow-2xl backdrop-blur-xl transition-all ${settings.darkMode ? 'border-white/10 bg-gradient-to-br from-slate-950/90 via-slate-900/70 to-slate-950/80' : 'border-blue-100 bg-white'}`}>
                <div className="max-w-4xl mx-auto text-center overflow-visible">
                  <div className={`mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full border-2 transition-all duration-500 ${settings.darkMode ? 'bg-slate-900 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:shadow-cyan-500/50' : 'bg-blue-50 border-blue-300 shadow-[0_0_30px_rgba(59,130,246,0.2)]'}`}>
                    <Zap className={`w-14 h-14 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] ${settings.darkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
                  </div>
                  <p className={`text-lg font-semibold mb-1 ${settings.darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>Hello, {settings.userName || 'User'}! 👋</p>
                  
                  <h1 className={`text-3xl md:text-5xl lg:text-6xl font-black tracking-tight !leading-[1.4] pb-4 ${settings.darkMode ? 'bg-gradient-to-r from-white via-cyan-200 to-slate-400 bg-clip-text text-transparent' : 'text-slate-900'}`}>
                    Smart Home Electricity Manager
                  </h1>
                  
                  <p className={`text-lg md:text-xl leading-relaxed ${settings.darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    One place to compare appliance wattage, view cost per minute and per hour, and download a QR code for every device.
                  </p>
                  <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <button onClick={() => setCurrentTab('APPLIANCES')} className="w-full sm:w-auto rounded-full bg-cyan-500 px-8 py-4 text-base font-bold text-slate-950 shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transition-all">Browse Appliances</button>
                    <button onClick={() => setCurrentTab('SCHEDULER')} className="w-full sm:w-auto rounded-full border-2 border-cyan-500 px-8 py-4 text-base font-bold text-cyan-500 hover:bg-cyan-500/10 transition-all">Open Scheduler</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                 <div className={`rounded-[2rem] border transition-all p-6 text-center ${settings.darkMode ? 'border-slate-800 bg-slate-900/70' : 'border-blue-100 bg-white'}`}>
                   <p className={`text-sm uppercase tracking-widest mb-2 ${settings.darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>Total Devices</p>
                   <p className={`text-2xl font-bold ${settings.darkMode ? 'text-white' : 'text-slate-900'}`}>{ALL_APPLIANCES.length}+</p>
                 </div>
                 <div className={`rounded-[2rem] border transition-all p-6 text-center group ${settings.darkMode ? 'border-slate-800 bg-slate-900/70 hover:border-cyan-500/50' : 'border-blue-100 bg-white hover:border-blue-300'}`}>
                   <p className={`text-sm uppercase tracking-widest mb-2 ${settings.darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>System Status</p>
                   <div className="flex items-center justify-center gap-2">
                     <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                     <p className={`text-xl font-bold ${settings.darkMode ? 'text-white' : 'text-slate-900'}`}>All Devices Normal</p>
                   </div>
                 </div>
                 <div className={`rounded-[2rem] border transition-all p-6 text-center ${settings.darkMode ? 'border-slate-800 bg-slate-900/70' : 'border-blue-100 bg-white'}`}>
                   <p className={`text-sm uppercase tracking-widest mb-2 ${settings.darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>Saving Tip</p>
                   <div className={`text-base font-medium leading-tight ${settings.darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                     <TipSlider />
                   </div>
                 </div>
              </div>

              <AboutWeb settings={settings} setCurrentTab={setCurrentTab} />
            </section>
          )}

          {currentTab === 'APPLIANCES' && <ApplianceGrid devices={devices} setDevices={setDevices} setSelectedApp={setSelectedApp} rate={rate} />}
          {currentTab === 'CALCULATOR' && <Calculator devices={devices} rate={rate} />}
          {currentTab === 'SCHEDULER' && <Scheduler devices={devices} rate={rate} />}
          {currentTab === 'REMOTE' && <SmartRemote />}
          {currentTab === 'SETTINGS' && <Settings settings={settings} setSettings={setSettings} />}
        </div>

        <MeralcoBadge rate={rate} />
        
        {/* Regular Modal for standard interactions */}
        {currentTab !== "SCAN_RESULT" && (
          <ApplianceModal selectedApp={selectedApp} setSelectedApp={setSelectedApp} rate={rate} />
        )}
      </div>
    </>
  );
}