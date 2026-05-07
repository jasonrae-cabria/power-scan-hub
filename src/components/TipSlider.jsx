import React, { useState, useEffect } from 'react';
import { ENERGY_TIPS } from './EnergyTips';

const TipSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ENERGY_TIPS.length);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return <>{ENERGY_TIPS[index]}</>;
};

export default TipSlider;