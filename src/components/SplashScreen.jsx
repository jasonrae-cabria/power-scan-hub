import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen({ onFinish }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950"
        >
          {/* LOGO ANIMATION */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            {/* Outer Glow */}
            <div className="absolute inset-0 blur-3xl bg-cyan-500/20 rounded-full" />
            
            {/* Your Logo (Icon placeholder) */}
            <div className="relative bg-gradient-to-br from-cyan-400 to-blue-600 p-6 rounded-[2.5rem] shadow-2xl shadow-cyan-500/40">
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <h1 className="text-2xl font-black tracking-[0.2em] text-white uppercase">
              Power Scan Hub
            </h1>
            <p className="mt-2 text-cyan-400/60 font-medium text-sm tracking-widest">
              SMART ENERGY MANAGEMENT
            </p>
          </motion.div>

          {/* Loading Bar */}
          <div className="mt-12 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full bg-cyan-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}