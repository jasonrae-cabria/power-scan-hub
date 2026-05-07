import { createContext, useContext, useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; 

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [devices, setDevices] = useState([]);
  const [scheduleEntries, setScheduleEntries] = useState({});
  // Binago natin 'to para mag-match sa App.jsx mo
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

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", "guest-user"), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setDevices(data.devices || []);
        setScheduleEntries(data.scheduleEntries || {});
        // Dito natin kukunin yung settings galing Firebase
        if (data.settings) {
          setSettings(data.settings);
        }
      }
    });
    return () => unsub();
  }, []);

  const saveData = async (newData) => {
    try {
      await setDoc(doc(db, "users", "guest-user"), newData, { merge: true });
    } catch (error) {
      console.error("Error saving data: ", error);
    }
  };

  return (
    <DataContext.Provider value={{ 
      devices, setDevices, 
      settings, setSettings, // Ito na yung gagamitin natin sa App.jsx
      scheduleEntries, setScheduleEntries, 
      saveData 
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);