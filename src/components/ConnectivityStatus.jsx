import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export default function ConnectivityStatus() {
  const [isOffline, setIsOffline] = useState(!window.navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[10000] bg-red-500 text-white py-2 px-4 flex items-center justify-center gap-2 animate-in slide-in-from-top duration-300">
      <WifiOff size={16} />
      <span className="text-xs font-bold uppercase tracking-widest">
        Check your connection. Some features may not work.
      </span>
    </div>
  );
}