
import React from 'react';
import { Terminal, Copy, ExternalLink, Key, Zap, Globe, ShieldCheck } from 'lucide-react';

const ApiDocsPanel: React.FC = () => {
  const codeSnippet = `{
  "event": "geofence.breach",
  "asset_id": "FLEET-A-01",
  "location": {
    "lat": 37.7749,
    "lng": -122.4194
  },
  "geofence_id": "GF-DOWNTOWN-ZONE",
  "timestamp": "2026-01-06T14:22:11Z"
}`;

  return (
    <div className="p-8 h-full flex flex-col gap-8 overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold font-heading">Developer Portal</h2>
          <p className="text-zinc-500 text-sm">Integrate GeoTrack Pro into your own stack with our high-performance APIs.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 glass text-white rounded-xl text-sm font-bold border-white/10 hover:bg-white/5 transition-all">
            <Key size={18} />
            Manage API Keys
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl text-sm font-bold hover:bg-zinc-200 transition-all">
            Full Documentation
            <ExternalLink size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Text Docs */}
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-blue-500">
              <Zap size={20} />
              <h3 className="text-lg font-bold">Real-time Webhooks</h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              GeoTrack Pro uses high-frequency WebSockets for live tracking and outgoing Webhooks for event-based triggers. 
              Configure your endpoint to receive <code>POST</code> requests whenever an asset enters or exits a predefined geofence.
            </p>
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
              <ShieldCheck className="text-blue-500 mt-0.5" size={16} />
              <p className="text-xs text-blue-100/70">All requests are signed with <code>X-GTP-Signature</code> to ensure origin authenticity.</p>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Endpoint Structure</h4>
            <div className="space-y-3">
              {[
                { method: 'GET', path: '/v1/assets', desc: 'List all tracking assets' },
                { method: 'POST', path: '/v1/geofences', desc: 'Create a new boundary' },
                { method: 'GET', path: '/v1/analytics/history', desc: 'Fetch historical trajectory' },
              ].map((api, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 group hover:bg-white/10 transition-all cursor-default">
                  <span className="text-[10px] font-black px-2 py-1 rounded bg-zinc-800 text-zinc-300 w-12 text-center">{api.method}</span>
                  <code className="text-sm font-mono text-zinc-300 flex-1">{api.path}</code>
                  <span className="text-xs text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">{api.desc}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-purple-500">
              <Globe size={20} />
              <h3 className="text-lg font-bold">Global CDN Support</h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Our map tiles and location clusters are cached globally across 200+ edge locations, ensuring sub-50ms latency for exploration events regardless of user region.
            </p>
          </section>
        </div>

        {/* Right Column: Code Play */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-zinc-500" />
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Webhook Payload Example</span>
            </div>
            <button className="text-zinc-500 hover:text-white transition-colors">
              <Copy size={16} />
            </button>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 p-6 font-mono text-sm leading-relaxed text-blue-300/80 shadow-2xl">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-3xl -z-10"></div>
            <pre>{codeSnippet}</pre>
          </div>
          <div className="p-6 rounded-2xl glass border-white/5 flex flex-col gap-4">
            <p className="text-xs font-bold text-zinc-400">AUTHENTICATION HEADER</p>
            <div className="bg-black/50 p-3 rounded-lg border border-white/5">
              <code className="text-zinc-500">Authorization: Bearer </code>
              <code className="text-blue-400">gtp_live_550e8400-e29b-41d4-a716...</code>
            </div>
            <p className="text-[10px] text-zinc-600">Keep your secret keys safe. Never commit them to version control.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocsPanel;
