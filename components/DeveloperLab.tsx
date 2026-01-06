
import React, { useState } from 'react';
import { Terminal, Copy, Zap, Code2, Play, CheckCircle2, RefreshCcw, Box, Smartphone, ShieldAlert, Lock, Unlock } from 'lucide-react';

const DeveloperLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'webhook' | 'privacy' | 'embed'>('webhook');
  const [isSimulating, setIsSimulating] = useState(false);
  const [lastEvent, setLastEvent] = useState<any>(null);

  const simulateEvent = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setLastEvent({
        id: "evt_" + Math.random().toString(36).substr(2, 9),
        type: "privacy.mask.applied",
        timestamp: new Date().toISOString(),
        payload: {
          asset_id: "FLEET-A-01",
          original: [37.774921, -122.419412],
          anonymized: [37.775, -122.419],
          method: "Tessellated Grid Snapping"
        }
      });
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="p-8 h-full flex flex-col gap-10 overflow-y-auto custom-scrollbar bg-[#050505]">
      <div className="flex justify-between items-start border-b-2 border-white pb-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-5xl font-bold font-heading tracking-tighter italic">LAB_SANDBOX</h2>
          <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest">Production-Grade Integration Testing Environment</p>
        </div>
        <div className="flex bg-zinc-950 p-1 border-2 border-white">
           <button onClick={() => setActiveTab('webhook')} className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'webhook' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}>Webhooks</button>
           <button onClick={() => setActiveTab('privacy')} className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'privacy' ? 'bg-[#FF3E00] text-black' : 'text-zinc-500 hover:text-white'}`}>GDPR Compliance</button>
           <button onClick={() => setActiveTab('embed')} className={`px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'embed' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}>Embedding</button>
        </div>
      </div>

      {activeTab === 'privacy' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-in fade-in duration-500">
           <div className="flex flex-col gap-8">
              <div className="p-10 border-2 border-[#FF3E00] bg-[#FF3E00]/5 relative overflow-hidden">
                 <ShieldAlert className="absolute -top-4 -right-4 text-[#FF3E00]/10 w-48 h-48" />
                 <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <Lock className="text-[#FF3E00]" /> ANONYMIZATION_ENGINE
                 </h3>
                 <p className="text-sm text-zinc-400 font-mono leading-relaxed mb-8">
                    To comply with GDPR "Right to be Forgotten" and data minimization, GeoTrack Pro utilizes <strong>Coordinate Tessellation</strong>. 
                    Historical routes are snapped to a 100m grid cell, effectively breaking the link to individual identities while preserving heatmaps.
                 </p>
                 <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border-2 border-white/10 bg-black">
                       <span className="text-xs font-bold uppercase tracking-widest">Differential Privacy Snapping</span>
                       <button className="px-4 py-2 bg-[#FF3E00] text-black font-black text-[10px] uppercase">Active</button>
                    </div>
                    <div className="flex items-center justify-between p-4 border-2 border-white/10 bg-black opacity-50">
                       <span className="text-xs font-bold uppercase tracking-widest">Regional Data Sharding</span>
                       <button className="px-4 py-2 bg-zinc-800 text-white font-black text-[10px] uppercase">Locked</button>
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                 <Terminal size={14} className="text-[#FF3E00]" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Privacy Validation Logs</span>
              </div>
              <div className="bg-black border-2 border-white p-8 font-mono text-xs text-[#00FF41] min-h-[400px]">
                 <pre className="leading-relaxed">
                    {`[SEC_LAYER] Handshake initiated...\n[SEC_LAYER] Method: RSA_AES_256\n[PRIVACY] Masking Lat: 37.7749 -> 37.775\n[PRIVACY] Masking Lng: -122.4194 -> -122.419\n[DATA] Snap-to-Grid complete.\n[COMPLIANCE] GDPR Validation: OK`}
                 </pre>
                 <button onClick={simulateEvent} className="mt-8 px-6 py-3 border-2 border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black transition-all font-black uppercase text-[10px]">Execute Masking Test</button>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'webhook' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-8">
            <div className="p-10 border-2 border-white bg-white/5">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Zap className="text-[#00FF41]" /> WEBHOOK_DISPATCHER
              </h3>
              <div className="space-y-4 mb-8 font-mono">
                {['geofence.enter', 'geofence.exit', 'asset.warning'].map((type) => (
                  <button key={type} className="w-full p-4 border-2 border-white/10 hover:border-[#00FF41] bg-black text-left flex items-center justify-between group transition-all">
                    <span className="text-xs font-bold uppercase tracking-widest">{type}</span>
                    <Play size={12} className="text-zinc-600 group-hover:text-[#00FF41]" />
                  </button>
                ))}
              </div>
              <button 
                onClick={simulateEvent}
                className="w-full py-5 bg-[#00FF41] text-black font-black text-xs uppercase tracking-[0.3em] active:translate-y-1 transition-all border-2 border-black"
              >
                Trigger Mock Event
              </button>
            </div>
          </div>

          <div className="bg-zinc-950 border-2 border-white p-8 font-mono text-xs text-blue-400">
             <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Event JSON Output</span>
                {lastEvent && <span className="text-[#00FF41] font-bold uppercase">200_OK</span>}
             </div>
             {lastEvent ? (
                <pre className="leading-relaxed h-80 overflow-auto">{JSON.stringify(lastEvent, null, 2)}</pre>
             ) : (
                <div className="h-80 flex flex-col items-center justify-center opacity-20">
                   <Terminal size={48} />
                   <p className="mt-4 text-[10px] uppercase tracking-widest font-bold">Awaiting Stream Data...</p>
                </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperLab;
