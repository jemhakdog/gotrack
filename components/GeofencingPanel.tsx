
import React, { useState } from 'react';
import { MOCK_GEOFENCES } from '../constants';
import { Shield, Plus, MapPin, Trash2, Bell, AlertCircle, Eye, Activity, History } from 'lucide-react';

const GeofencingPanel: React.FC = () => {
  const [fences, setFences] = useState(MOCK_GEOFENCES);
  const [selectedFenceId, setSelectedFenceId] = useState(MOCK_GEOFENCES[0].id);

  const selectedFence = fences.find(f => f.id === selectedFenceId) || fences[0];

  const handleCreate = () => {
    const newFence = {
      id: `gf-${Date.now()}`,
      name: `New Boundary Area ${fences.length + 1}`,
      points: [[37.78, -122.42], [37.78, -122.41], [37.77, -122.41]] as [number, number][],
      type: 'delivery' as const,
      radius: 500
    };
    setFences([newFence, ...fences]);
    setSelectedFenceId(newFence.id);
  };

  return (
    <div className="p-8 h-full flex flex-col gap-8 overflow-hidden bg-black/20">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
            <h2 className="text-3xl font-bold font-heading tracking-tight">Geofencing Engine</h2>
          </div>
          <p className="text-zinc-500 text-sm max-w-lg">Manage multi-point polygon boundaries with automated server-side breach detection and logic triggers.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2.5 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-sm font-black transition-all shadow-xl shadow-blue-600/20 active:scale-95"
        >
          <Plus size={18} />
          Define New Polygon
        </button>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-8 overflow-hidden">
        {/* Boundary Library */}
        <div className="col-span-4 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-3">
          <div className="flex items-center justify-between px-2 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
            <span>Active Boundaries</span>
            <span>{fences.length} Total</span>
          </div>
          {fences.map((fence) => (
            <div 
              key={fence.id}
              onClick={() => setSelectedFenceId(fence.id)}
              className={`p-5 rounded-3xl border transition-all cursor-pointer group relative overflow-hidden ${
                selectedFenceId === fence.id 
                  ? 'bg-blue-600/10 border-blue-600/40' 
                  : 'glass border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl ${fence.type === 'security' ? 'bg-blue-500/15 text-blue-400' : fence.type === 'restricted' ? 'bg-rose-500/15 text-rose-400' : 'bg-emerald-500/15 text-emerald-400'}`}>
                  <Shield size={20} />
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${
                    fence.type === 'security' ? 'bg-blue-500/20 text-blue-400' : fence.type === 'restricted' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    {fence.type}
                  </span>
                  <div className="flex gap-1 mt-1">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse delay-75"></div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{fence.name}</h3>
              <p className="text-xs text-zinc-500 mb-5 flex items-center gap-2">
                <MapPin size={12} className="text-zinc-700" />
                Coverage: ~{fence.radius * 2}sqm • 4-Point Polygon
              </p>
              <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400">
                  <Bell size={12} className="text-zinc-600" /> Webhooks On
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  Edit Points <Plus size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Boundary Control Center */}
        <div className="col-span-8 flex flex-col gap-6 h-full">
          <div className="glass rounded-[32px] flex-1 relative overflow-hidden group border-white/10">
            {/* Visual preview of the map static view */}
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/pin-s+ff4444(37.7749,-122.4194)/-122.4194,37.7749,14/1200x800?access_token=pk.ey')] bg-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            
            <div className="absolute top-8 left-8 flex items-center gap-3">
               <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2 border-white/10">
                  <Activity size={16} className="text-emerald-500" />
                  <span className="text-[10px] font-black uppercase text-zinc-300">Live Traffic Monitoring</span>
               </div>
            </div>

            <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <h4 className="text-4xl font-bold tracking-tight">{selectedFence.name}</h4>
                </div>
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2 text-zinc-400 text-sm">
                      <History size={16} />
                      Uptime: 142 days
                   </div>
                   <div className="h-1 w-1 rounded-full bg-zinc-700"></div>
                   <div className="text-zinc-400 text-sm">Created by A. Chen</div>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setFences(f => f.filter(x => x.id !== selectedFenceId))}
                  className="p-4 glass rounded-2xl hover:bg-rose-500/20 hover:text-rose-500 transition-all text-zinc-500 border-white/5 hover:border-rose-500/50"
                >
                  <Trash2 size={24} />
                </button>
                <button className="px-8 py-4 bg-white text-black rounded-2xl font-black text-sm hover:bg-zinc-200 transition-all flex items-center gap-2">
                  <Eye size={18} />
                  Inspect Protocol
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 h-40">
            <div className="glass p-8 rounded-3xl flex flex-col justify-between border-l-4 border-blue-500 bg-blue-500/5">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Total Entry Events</p>
              <div className="flex items-end gap-3">
                <p className="text-4xl font-bold tracking-tighter">1,242</p>
                <span className="text-xs text-emerald-500 font-bold mb-1">+4%</span>
              </div>
            </div>
            <div className="glass p-8 rounded-3xl flex flex-col justify-between border-l-4 border-amber-500 bg-amber-500/5">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Exit Monitoring</p>
              <div className="flex items-end gap-3">
                <p className="text-4xl font-bold tracking-tighter">1,108</p>
                <span className="text-xs text-zinc-600 font-bold mb-1">STABLE</span>
              </div>
            </div>
            <div className="glass p-8 rounded-3xl flex flex-col justify-between border-l-4 border-rose-500 bg-rose-500/5">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Security Incidents</p>
              <div className="flex items-end gap-3">
                <p className="text-4xl font-bold tracking-tighter text-rose-500">3</p>
                <button className="text-[10px] text-rose-500 font-black underline mb-1 tracking-tighter hover:text-rose-400">RESOLVE NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeofencingPanel;
