import { useState } from 'react';
import { useData } from '../context/DataContext';
import { ALL_APPLIANCES } from './AppliancesList';

const CATEGORIES = ["All", "Kitchen", "Living Room", "Bedroom", "Bathroom", "Office", "Laundry", "Entertainment", "Outdoor", "HVAC",];

const CATEGORY_ICON = {
  Kitchen: "CookingPot",
  "Living Room": "Tv",
  Bedroom: "Snowflake",
  Bathroom: "Droplets",
  Office: "Monitor",
  Laundry: "WashingMachine",
  Entertainment: "Gamepad2",
  Outdoor: "TreePine",
  HVAC: "Thermometer",
};

const ICON_MAP = {
  Microwave: "🍲",
  CookingPot: "🍳",
  Coffee: "☕",
  Flame: "🔥",
  Refrigerator: "🧊",
  Blend: "🥤",
  Sandwich: "🥪",
  Droplets: "💧",
  Fan: "🌀",
  Speaker: "🔊",
  Tv: "📺",
  Monitor: "🖥️",
  Laptop: "💻",
  Wifi: "📡",
  BatteryCharging: "🔋",
  Printer: "🖨️",
  Camera: "📷",
  GlassWater: "🥛",
  Bug: "🐞",
  Bed: "🛏️",
  Lightbulb: "💡",
  Snowflake: "❄️",
  Wind: "🌬️",
  Shield: "🛡️",
  Music: "🎵",
  Gamepad2: "🎮",
  Activity: "🏃",
  Fish: "🐟",
  Plane: "✈️",
  Bike: "🚲",
  TreePine: "🌲",
  Thermometer: "🌡️",
  Scissors: "✂️",
  Keyboard: "⌨️",
  Tablet: "📱",
  Soap: "🧼",
  DoorOpen: "🚪",
  HardDrive: "💽",
};


const CATEGORY_GRADIENT = {
  Kitchen: "from-orange-500 to-rose-500",
  "Living Room": "from-cyan-500 to-blue-500",
  Bedroom: "from-violet-500 to-fuchsia-500",
  Bathroom: "from-sky-500 to-cyan-500",
  Office: "from-emerald-500 to-teal-500",
  Laundry: "from-slate-500 to-slate-700",
  Entertainment: "from-amber-500 to-orange-500",
  Outdoor: "from-green-500 to-emerald-500",
  HVAC: "from-blue-500 to-cyan-500",
  All: "from-slate-600 to-slate-800",
};

const INITIAL_FORM_STATE = {
  name: "",
  brand: "",
  watts: "",
  category: "Kitchen",
  description: "",
};

export default function ApplianceGrid({ setSelectedApp, rate }) {
  const { devices: customDevices, saveData } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [newDevice, setNewDevice] = useState(INITIAL_FORM_STATE);
  const [editingId, setEditingId] = useState(null); 

  const allDevices = [...customDevices, ...ALL_APPLIANCES];
  const categoryOptions = CATEGORIES.filter((cat) => cat !== "All");
  
  const filteredAppliances = allDevices
    .filter(app => {
      const matchesCategory = activeCategory === 'All' || app.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = searchTerm === '' || 
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (app.brand && app.brand.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (searchTerm === '') return 0;
      const aStarts = a.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ? 1 : 0;
      const bStarts = b.name.toLowerCase().startsWith(searchTerm.toLowerCase()) ? 1 : 0;
      return bStarts - aStarts;
    });

  const handleEdit = (e, app) => {
    e.stopPropagation(); 
    setEditingId(app.id);
    setNewDevice({
      name: app.name,
      brand: app.brand,
      watts: app.watts.toString(),
      category: app.category,
      description: app.description,
    });
    setShowForm(true);
    window.scrollTo({ top: 400, behavior: 'smooth' }); 
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this device?")) {
      const updatedDevices = customDevices.filter(d => d.id !== id);
      saveData({ devices: updatedDevices });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const watts = parseFloat(newDevice.watts);
    if (!newDevice.name.trim() || Number.isNaN(watts)) return;

    let updatedDevices;
    if (editingId) {
      updatedDevices = customDevices.map(d => d.id === editingId ? {
        ...d,
        name: newDevice.name.trim(),
        brand: newDevice.brand.trim() || 'Custom',
        watts,
        category: newDevice.category,
        description: newDevice.description.trim(),
        icon: CATEGORY_ICON[newDevice.category] || 'Microwave',
      } : d);
    } else {
      const newItem = {
        id: `custom-${Date.now()}`,
        name: newDevice.name.trim(),
        brand: newDevice.brand.trim() || 'Custom',
        watts,
        category: newDevice.category,
        description: newDevice.description.trim(),
        icon: CATEGORY_ICON[newDevice.category] || 'Microwave',
      };
      updatedDevices = [newItem, ...customDevices];
    }

    saveData({ devices: updatedDevices });
    setNewDevice(INITIAL_FORM_STATE);
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <section className="space-y-8">
      <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/70 p-10 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-cyan-300 font-semibold uppercase tracking-[0.4em] mb-2">Appliances</p>
            <h2 className="text-4xl font-black tracking-tight">Browse existing devices</h2>
          </div>
          <p className="max-w-xl text-slate-400">Use search, filter categories, and add custom devices that appear instantly in the list.</p>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1 flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search brand or appliance..."
              className="flex-1 rounded-3xl border border-slate-800 bg-slate-950 px-5 py-4 text-white outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
            <button type="button" onClick={() => setSearchTerm('')} className="ml-3 text-slate-400 hover:text-cyan-400 transition-colors">
              {searchTerm ? '✕' : '🔍'}
            </button>
          </div>
          
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) {
                setEditingId(null);
                setNewDevice(INITIAL_FORM_STATE);
              }
            }}
            className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
          >
            {showForm ? 'Cancel Operation' : 'Add New Device'}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} className="w-full max-w-4xl rounded-[2rem] border border-cyan-500/30 bg-slate-950/90 p-6 shadow-2xl">
              <h4 className="text-xl font-bold mb-4 text-cyan-400">{editingId ? 'Edit Your Device' : 'Create New Device'}</h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">Device Name</label>
                  <input
                    value={newDevice.name}
                    onChange={(e) => setNewDevice({...newDevice, name: e.target.value})}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">Brand</label>
                  <input
                    value={newDevice.brand}
                    onChange={(e) => setNewDevice({...newDevice, brand: e.target.value})}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">Wattage</label>
                  <input
                    type="number"
                    value={newDevice.watts}
                    onChange={(e) => setNewDevice({...newDevice, watts: e.target.value})}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-300">Category</label>
                  <select
                    value={newDevice.category}
                    onChange={(e) => setNewDevice({...newDevice, category: e.target.value})}
                    className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
                  >
                    {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold text-slate-300">Description</label>
                <textarea
                  value={newDevice.description}
                  onChange={(e) => setNewDevice({...newDevice, description: e.target.value})}
                  className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-4 text-white outline-none focus:border-cyan-500"
                  rows="3"
                  required
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button type="submit" className="rounded-3xl bg-cyan-500 px-8 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-400">
                  {editingId ? 'Update Device' : 'Save Device'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-4">
        {filteredAppliances.map((app) => {
          const isCustom = app.id.toString().startsWith('custom-');
          return (
            <div key={app.id} onClick={() => setSelectedApp(app)}
              className="relative bg-slate-900/40 border border-slate-800 p-3 md:p-6 rounded-[2rem] hover:bg-slate-800/40 hover:border-cyan-500 cursor-pointer transition-all group active:scale-95">
              
              {isCustom && (
                <div className="absolute top-4 right-4 flex gap-2 z-10">
                  <button onClick={(e) => handleEdit(e, app)} className="p-2 bg-slate-800 rounded-lg hover:text-cyan-400 text-slate-400 transition-colors">
                    ✏️
                  </button>
                  <button onClick={(e) => handleDelete(e, app.id)} className="p-2 bg-slate-800 rounded-lg hover:text-red-400 text-slate-400 transition-colors">
                    🗑️
                  </button>
                </div>
              )}

              <div className="flex justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${CATEGORY_GRADIENT[app.category] ? `bg-gradient-to-br ${CATEGORY_GRADIENT[app.category]} text-white` : 'bg-slate-800 text-cyan-400'}`}>
                  {ICON_MAP[app.icon] || "⚡"}
                </div>
                {!isCustom && <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-800/60 px-2 py-1 rounded-md">{app.category}</span>}
              </div>
              <h3 className="text-lg font-bold group-hover:text-cyan-400 truncate pr-12">{app.name}</h3>
              <p className="text-slate-400 text-sm mb-4">{app.brand || "Generic"}</p>
              <div className="flex justify-between items-center bg-slate-950/70 p-3 rounded-3xl border border-slate-800">
                <span className="text-lg font-black">{app.watts}W</span>
                <span className="text-sm text-cyan-400 font-bold">₱{((app.watts/1000) * rate).toFixed(2)}/hr</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}