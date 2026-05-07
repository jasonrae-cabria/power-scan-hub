import { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; 

const DataContext = createContext();

const getOrCreateDeviceId = () => {
  let id = localStorage.getItem('power_scan_device_id');
  if (!id) {
    id = 'user_' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem('power_scan_device_id', id);
  }
  return id;
};

export const DataProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [scheduleEntries, setScheduleEntries] = useState({});
  const [settings, setSettings] = useState({
    darkMode: true,
    notifications: true,
    autoSchedule: true,
    meralcoRate: 11.8569,
    remoteStyle: "Modern",
    userName: "",
    userAge: "",
    userAddress: "",
  });

  const deviceId = getOrCreateDeviceId();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", deviceId), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setDevices(data.devices || []);
        setScheduleEntries(data.scheduleEntries || {});
        if (data.settings) {
          setSettings(data.settings);
        }
      }
    });
    return () => unsub();
  }, [deviceId]);

  const saveData = async (newData) => {
    try {
      await setDoc(doc(db, "users", deviceId), newData, { merge: true });
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  return (
    <DataContext.Provider value={{ 
      devices, setDevices, 
      settings, setSettings,
      scheduleEntries, setScheduleEntries, 
      saveData 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);