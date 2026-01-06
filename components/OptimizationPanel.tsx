
import React from 'react';
import { MOCK_ROUTES } from '../constants';
import { Route, Timer, CheckCircle2, AlertCircle, ChevronRight, BarChart3, Wind } from 'lucide-react';

const OptimizationPanel: React.FC = () => {
  return (
    <div className="p-8 h-full flex flex-col gap-8 overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold font-heading">Route Optimization</h2>
          <p className="text-zinc-500 text-sm">Algorithmic pathfinding to maximize fleet efficiency and reduce fuel overhead.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass px-4 py-2 rounded-xl flex items-center gap-3 border-emerald-500/20">
            <BarChart3 size={18} className="text-emerald-500" />
            <div>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Avg Efficiency</p>
              <p className="text-sm font-bold">92.4%</p>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20">
            Recalculate All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass p-6 rounded-2xl border-l-4 border-blue-500 bg-gradient-to-r from-blue-900/10 to-transparent">
            <div className="flex items-center gap-3 mb-4">
              <Wind size={18} className="text-blue-500" />
              <h3 className="font-bold">Active Optimization Engine</h3>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Our AI engine is currently processing 14 active routes in the San Francisco North sector. 
              Efficiency has increased by 14% since the last update due to dynamic traffic bypassing.
            </p>
            <div className="flex gap-8">
              <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Total Miles Saved</p>
                <p className="text-xl font-bold">1,204.5</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Carbon Reduction</p>
                <p className="text-xl font-bold text-emerald-500">2.4 Tons</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">Live Routing Table</h3>
            {MOCK_ROUTES.map((route) => (
              <div key={route.id} className="glass p-5 rounded-2xl flex items-center justify-between border-white/5 hover:border-white/10 transition-all group cursor-pointer">
                <div className="flex items-center gap-5">
                  <div className={`p-3 rounded-xl ${route.status === 'optimal' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    <Route size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{route.name}</h4>
                    <p className="text-xs text-zinc-500">{route.stops} stops &bull; Planned {route.time} duration</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Efficiency Score</p>
                    <p className={`font-bold ${route.status === 'optimal' ? 'text-emerald-500' : 'text-amber-500'}`}>{route.efficiency}</p>
                  </div>
                  <ChevronRight size={18} className="text-zinc-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass p-8 rounded-3xl h-full relative overflow-hidden flex flex-col justify-end min-h-[400px]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&q=80')] bg-cover opacity-20 grayscale"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="p-2 w-fit rounded-lg bg-blue-600/20 text-blue-400">
                <Timer size={24} />
              </div>
              <h3 className="text-2xl font-bold">Predictive ETA Analysis</h3>
              <p className="text-sm text-zinc-400">
                AI models predict 98% accuracy for all "Optimal" status routes today. 
                Weather conditions in the Bay Area are expected to delay Westside routes by 12%.
              </p>
              <button className="w-full mt-4 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all">
                View Predictive Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationPanel;
