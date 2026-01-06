
import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, Cell 
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, Clock, Server, Zap, Target, MousePointer2 } from 'lucide-react';

const data = [
  { name: '00:00', volume: 400, latency: 12, predicted: 420 },
  { name: '04:00', volume: 300, latency: 15, predicted: 310 },
  { name: '08:00', volume: 900, latency: 28, predicted: 850 },
  { name: '12:00', volume: 1400, latency: 32, predicted: 1450 },
  { name: '16:00', volume: 1100, latency: 25, predicted: 1120 },
  { name: '20:00', volume: 800, latency: 18, predicted: 780 },
  { name: '23:59', volume: 600, latency: 14, predicted: 610 },
];

const StatsCard = ({ title, value, change, icon: Icon, isPositive, trend }: any) => (
  <div className="glass p-7 rounded-[28px] flex flex-col gap-6 relative overflow-hidden group hover:border-white/20 transition-all border-white/5">
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] -translate-y-1/2 translate-x-1/2 rounded-full"></div>
    <div className="flex justify-between items-center relative z-10">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </div>
    </div>
    <div className="relative z-10">
      <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-black mb-1">{title}</p>
      <h4 className="text-3xl font-bold text-white tracking-tight">{value}</h4>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-4 rounded-2xl border-white/10 shadow-2xl backdrop-blur-xl">
        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-3 mb-1">
             <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></div>
             <p className="text-xs font-bold text-white uppercase tracking-tight">{p.name}: {p.value}</p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const AnalyticsPanel: React.FC = () => {
  return (
    <div className="p-8 h-full overflow-y-auto custom-scrollbar flex flex-col gap-10 bg-black/10">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-6 bg-purple-600 rounded-full"></div>
             <h2 className="text-4xl font-bold font-heading tracking-tight">Performance Analytics</h2>
          </div>
          <p className="text-zinc-500 text-sm">Aggregated telemetry data processing {data.reduce((a,b)=>a+b.volume, 0)}k pings / 24h.</p>
        </div>
        <div className="flex gap-3">
           <button className="px-5 py-2.5 glass rounded-xl text-xs font-black uppercase tracking-widest text-zinc-400 border-white/5 hover:border-white/20 transition-all flex items-center gap-2">
              <MousePointer2 size={14} /> Export Dataset
           </button>
           <button className="px-5 py-2.5 bg-blue-600 rounded-xl text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all">
              Live Feed
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Pings" value="2.4M" change="+12.5%" icon={Zap} isPositive={true} />
        <StatsCard title="Avg Latency" value="42ms" change="-4.2%" icon={Clock} isPositive={true} />
        <StatsCard title="API Uptime" value="99.98%" change="+0.02%" icon={Server} isPositive={true} />
        <StatsCard title="Active Nodes" value="84/86" change="-2.1%" icon={Activity} isPositive={false} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4">
        <div className="glass p-10 rounded-[40px] h-[500px] flex flex-col border-white/5 relative group">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500"><Activity size={20} /></div>
              Fleet Volume Analysis
            </h3>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500"></div><span className="text-[10px] font-black text-zinc-500 uppercase">Actual</span></div>
               <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border border-blue-500/50"></div><span className="text-[10px] font-black text-zinc-500 uppercase">Predicted</span></div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#ffffff05" />
                <XAxis dataKey="name" stroke="#444" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#444" fontSize={10} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#3b82f6" 
                  strokeDasharray="4 4" 
                  fill="transparent" 
                  strokeWidth={1}
                />
                <Area 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorVolume)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-10 rounded-[40px] h-[500px] flex flex-col border-white/5 group">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-bold flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500"><Clock size={20} /></div>
              Network Response Latency
            </h3>
            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full">
               <span className="text-[9px] font-black text-emerald-500 uppercase">Latency Optimizing</span>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis dataKey="name" stroke="#444" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#444" fontSize={10} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  cursor={{ fill: '#ffffff03' }}
                  content={<CustomTooltip />}
                />
                <Bar dataKey="latency" animationDuration={1500}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.latency > 30 ? '#ef4444' : '#a855f7'} fillOpacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
         <div className="lg:col-span-2 glass p-10 rounded-[40px] border-white/5 flex flex-col gap-6">
            <h4 className="text-lg font-bold flex items-center gap-2">
               <Target size={18} className="text-blue-500" />
               Geofencing Throughput
            </h4>
            <div className="flex gap-10">
               {[
                 { label: 'Active Zones', value: '42' },
                 { label: 'Avg Breaches/h', value: '1.2' },
                 { label: 'Response Time', value: '0.8s' },
                 { label: 'Accuracy', value: '99.9%' }
               ].map((stat, i) => (
                 <div key={i} className="flex flex-col gap-1">
                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-2xl font-bold text-white tracking-tighter">{stat.value}</p>
                 </div>
               ))}
            </div>
         </div>
         <div className="glass p-10 rounded-[40px] border-white/5 flex flex-col justify-center gap-4 bg-gradient-to-br from-blue-900/10 to-transparent">
            <h4 className="text-lg font-bold">Predictive Scaling</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">System expects 20% surge in volume over the next 4 hours. Auto-scaling nodes 12-15 initialized.</p>
            <div className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest">
               Execute Scale Protocol <ArrowUpRight size={12} />
            </div>
         </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
