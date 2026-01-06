
import React, { useState } from 'react';
import { NAVIGATION_ITEMS } from '../constants';
import { AppSection } from '../types';
import { Boxes, User, Globe2, ChevronDown, Database } from 'lucide-react';

interface SidebarProps {
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onNavigate }) => {
  const [region, setRegion] = useState('eu-central-1');

  return (
    <aside className="w-80 bg-black border-r-2 border-white h-full flex flex-col z-50">
      <div className="p-8 border-b-2 border-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-white flex items-center justify-center text-black font-black text-xl">
            GT
          </div>
          <h1 className="text-2xl font-bold font-heading tracking-tighter">GEOTRACK</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#00FF41] animate-pulse"></div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">System Operational</span>
        </div>
      </div>

      <div className="p-6 border-b-2 border-white bg-zinc-950">
        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Database size={10} /> Data Residency
        </p>
        <div className="relative group">
          <select 
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full bg-black border-2 border-white text-xs font-bold p-3 appearance-none focus:outline-none focus:border-[#00FF41] transition-colors cursor-pointer"
          >
            <option value="eu-central-1">EU-CENTRAL-1 (Frankfurt)</option>
            <option value="us-east-1">US-EAST-1 (Virginia)</option>
            <option value="ap-southeast-1">AP-SOUTHEAST-1 (Singapore)</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500" size={14} />
        </div>
        <p className="text-[8px] text-zinc-600 mt-2 font-mono italic leading-tight">
          Strict GDPR compliance mode active. Regional data stays in-silo.
        </p>
      </div>

      <nav className="flex-1 mt-4 px-4 space-y-2">
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as AppSection)}
            className={`w-full flex items-center gap-4 px-5 py-3 transition-all ${
              activeSection === item.id
                ? 'bg-[#00FF41] text-black border-2 border-black -translate-y-1 translate-x-1 shadow-[-4px_4px_0px_#fff]'
                : 'text-zinc-500 hover:text-white border-2 border-transparent hover:border-white'
            }`}
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <span className="font-bold text-xs uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-8 mt-auto border-t-2 border-white">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-12 h-12 border-2 border-white flex items-center justify-center bg-zinc-900 group-hover:bg-[#00FF41] group-hover:text-black transition-colors">
            <User size={24} />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-white">Alex Chen</p>
            <p className="text-[10px] text-zinc-500 font-mono">ROOT_ADMIN</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
