
import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polygon, Circle, Polyline, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MAP_TILES, MAP_ATTRIBUTION, MOCK_ASSETS, MOCK_GEOFENCES } from '../constants';
// Added missing 'Activity' import
import { Search, Navigation, Filter, MoreHorizontal, TrendingUp, AlertTriangle, Flame, ExternalLink, Zap, Bell, X, Target, Mic, Clock, MapPin, Layers, Moon, Sun, Globe, Ruler, Package, Truck, Home, CheckCircle2, Terminal, Share2, Copy, Activity } from 'lucide-react';
import { getGeospatialInsights, semanticGeocode, getDistanceAnalysis } from '../services/gemini';

const NeoMarkerIcon = (status: string, isSelected: boolean) => new L.DivIcon({
  className: 'custom-div-icon',
  html: `<div class="w-7 h-7 border-2 ${isSelected ? 'border-[#00FF41] scale-125 z-[1000]' : 'border-white'} flex items-center justify-center transition-all bg-black shadow-[4px_4px_0px_rgba(255,255,255,0.2)]">
    <div class="w-full h-full relative flex items-center justify-center">
       <div class="absolute inset-0 border border-white/10"></div>
       <div class="w-2 h-2 ${status === 'active' ? 'bg-[#00FF41]' : status === 'warning' ? 'bg-[#FF3E00]' : 'bg-zinc-600'}"></div>
       <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/20"></div>
       <div class="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-full bg-white/20"></div>
    </div>
  </div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const MapController = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 1 });
  }, [center, zoom, map]);
  return null;
};

const DistanceRuler = ({ onPointSet }: { onPointSet: (latlng: L.LatLng) => void }) => {
  useMapEvents({
    click(e) {
      onPointSet(e.latlng);
    },
  });
  return null;
};

const TrackingView: React.FC = () => {
  const [assets, setAssets] = useState(MOCK_ASSETS);
  const [mapTheme, setMapTheme] = useState<'dark' | 'light' | 'satellite'>('dark');
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showTelemetry, setShowTelemetry] = useState(false);
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);
  
  const [isRulerMode, setIsRulerMode] = useState(false);
  const [rulerPoints, setRulerPoints] = useState<L.LatLng[]>([]);
  const [distanceInfo, setDistanceInfo] = useState<{dist: number, analysis: string} | null>(null);

  const [mapViewport, setMapViewport] = useState<{center: [number, number], zoom: number}>({
    center: [37.7749, -122.4194],
    zoom: 13
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prev => prev.map(asset => {
        if (asset.status === 'idle') return asset;
        const drift = (Math.random() - 0.5) * 0.002;
        return {
          ...asset,
          lat: asset.lat + drift,
          lng: asset.lng + drift,
          speed: Math.floor(Math.random() * 20) + 25
        };
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handlePointSet = async (latlng: L.LatLng) => {
    if (!isRulerMode) return;
    const newPoints = [...rulerPoints, latlng];
    if (newPoints.length > 2) {
      setRulerPoints([latlng]);
      setDistanceInfo(null);
    } else {
      setRulerPoints(newPoints);
      if (newPoints.length === 2) {
        const dist = newPoints[0].distanceTo(newPoints[1]) / 1000;
        setDistanceInfo({ dist, analysis: "AI analyzing road capacity..." });
        const analysis = await getDistanceAnalysis([newPoints[0].lat, newPoints[0].lng], [newPoints[1].lat, newPoints[1].lng], dist);
        setDistanceInfo({ dist, analysis });
      }
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    const location = await semanticGeocode(searchQuery);
    if (location) {
      setMapViewport({ center: [location.lat, location.lng], zoom: 16 });
    }
    setIsSearching(false);
  };

  const selectedAsset = useMemo(() => assets.find(a => a.id === selectedAssetId), [assets, selectedAssetId]);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <div className="map-grid-overlay"></div>
      <div className="scanline"></div>
      
      <MapContainer center={mapViewport.center} zoom={mapViewport.zoom} style={{ height: '100%', width: '100%' }} zoomControl={false}>
        <TileLayer url={MAP_TILES[mapTheme]} attribution={MAP_ATTRIBUTION} />
        <MapController center={mapViewport.center} zoom={mapViewport.zoom} />
        
        {isRulerMode && <DistanceRuler onPointSet={handlePointSet} />}
        
        {assets.map((asset) => {
          // GDPR Anonymization Logic
          const displayLat = isPrivacyMode ? Math.round(asset.lat * 100) / 100 : asset.lat;
          const displayLng = isPrivacyMode ? Math.round(asset.lng * 100) / 100 : asset.lng;

          return (
            <Marker 
              key={asset.id} 
              position={[displayLat, displayLng]} 
              icon={NeoMarkerIcon(asset.status, selectedAssetId === asset.id)}
              eventHandlers={{ click: () => setSelectedAssetId(asset.id) }}
            >
              <Popup className="neo-popup">
                <div className="p-4 bg-black border-2 border-white min-w-[260px] shadow-[8px_8px_0px_#000]">
                  <div className="flex justify-between items-start mb-4 border-b-2 border-white/10 pb-2">
                    <div>
                      <h3 className="text-sm font-black uppercase text-[#00FF41]">{asset.name}</h3>
                      <p className="text-[10px] font-mono text-zinc-500">{asset.orderId}</p>
                    </div>
                    <div className="px-2 py-1 border border-white text-[9px] font-bold">LIVE</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 font-mono text-[10px]">
                    <div>
                      <p className="text-zinc-600 uppercase">Velocity</p>
                      <p className="text-white font-bold">{asset.speed} MPH</p>
                    </div>
                    <div>
                      <p className="text-zinc-600 uppercase">Sector</p>
                      <p className="text-white font-bold">S-412</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-[9px] font-bold uppercase">
                      <span className="text-zinc-500">Milestone</span>
                      <span className="text-[#00FF41]">{asset.milestone}</span>
                    </div>
                    <div className="h-2 border-2 border-white flex">
                      <div className={`h-full bg-[#00FF41] ${asset.milestone === 'warehouse' ? 'w-1/4' : asset.milestone === 'transit' ? 'w-2/4' : asset.milestone === 'last-mile' ? 'w-3/4' : 'w-full'}`}></div>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-white text-black font-black text-[10px] uppercase hover:bg-[#00FF41] transition-colors border-2 border-black">
                    Analyze Trajectory
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {MOCK_GEOFENCES.map((gf) => (
          <Polygon key={gf.id} positions={gf.points} pathOptions={{ color: '#fff', fillColor: '#00FF41', fillOpacity: 0.1, weight: 2, dashArray: '5, 5' }} />
        ))}
      </MapContainer>

      {/* SEARCH OVERLAY */}
      <div className="absolute top-8 left-8 z-[1000] w-[460px]">
        <form onSubmit={handleSearch} className="bg-black border-2 border-white flex items-center p-4 shadow-[8px_8px_0px_rgba(255,255,255,0.1)] focus-within:border-[#00FF41] transition-all">
          <Search size={20} className="text-zinc-500 mr-4" />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="INPUT COMMAND OR COORDINATES..."
            className="bg-transparent border-none outline-none font-mono text-sm w-full text-white placeholder:text-zinc-800"
          />
          <button type="submit" className="ml-4 p-2 bg-white text-black hover:bg-[#00FF41] transition-colors">
            <Target size={18} />
          </button>
        </form>
      </div>

      {/* TOOLBAR */}
      <div className="absolute bottom-8 right-8 z-[1000] flex flex-col gap-4">
        <div className="flex flex-col gap-2 p-2 bg-black border-2 border-white shadow-[8px_8px_0px_rgba(0,0,0,0.5)]">
          <button onClick={() => setMapTheme('dark')} className={`p-4 border-2 ${mapTheme === 'dark' ? 'bg-[#00FF41] border-black text-black' : 'border-transparent text-white hover:border-white'}`}><Moon size={20} /></button>
          <button onClick={() => setMapTheme('satellite')} className={`p-4 border-2 ${mapTheme === 'satellite' ? 'bg-[#00FF41] border-black text-black' : 'border-transparent text-white hover:border-white'}`}><Globe size={20} /></button>
          <button onClick={() => setIsRulerMode(!isRulerMode)} className={`p-4 border-2 ${isRulerMode ? 'bg-[#FF3E00] border-black text-black' : 'border-transparent text-white hover:border-white'}`}><Ruler size={20} /></button>
        </div>
        <button 
          onClick={() => { setMapViewport({ center: [37.7749, -122.4194], zoom: 13 }); setSelectedAssetId(null); }}
          className="p-5 bg-white text-black border-2 border-black hover:bg-[#00FF41] transition-all active:translate-y-1 shadow-[4px_4px_0px_rgba(255,255,255,0.2)]"
        >
          <Navigation size={24} />
        </button>
      </div>

      {/* TELEMETRY HUD */}
      <div className="absolute top-8 right-8 z-[1000] flex flex-col gap-4 pointer-events-none">
        <div className="bg-black border-2 border-white p-6 w-80 shadow-[8px_8px_0px_#00FF41] pointer-events-auto">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-[#00FF41]" size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Global Sector-1 Telemetry</span>
          </div>
          <div className="space-y-3 font-mono">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-600">Assets Online</span>
              <span className="text-white">1,402</span>
            </div>
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-600">Breach Events</span>
              <span className="text-[#FF3E00]">03</span>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
               <div className="flex items-center justify-between mb-2">
                 <span className="text-[9px] text-zinc-500 font-bold uppercase">Privacy Snapping</span>
                 <button onClick={() => setIsPrivacyMode(!isPrivacyMode)} className={`w-10 h-5 border-2 border-white relative transition-colors ${isPrivacyMode ? 'bg-[#00FF41]' : 'bg-black'}`}>
                   <div className={`absolute top-0 w-3 h-full bg-white transition-all ${isPrivacyMode ? 'right-0' : 'left-0'}`}></div>
                 </button>
               </div>
               <p className="text-[8px] text-zinc-600 leading-tight">Snapping active: GPS coordinates masked to 3-point precision.</p>
            </div>
          </div>
        </div>
        
        {distanceInfo && (
           <div className="bg-black border-2 border-[#00FF41] p-6 w-80 shadow-[8px_8px_0px_#000] pointer-events-auto animate-in slide-in-from-right">
              <p className="text-[10px] font-black text-zinc-500 mb-2 uppercase tracking-widest">Distance Logic Result</p>
              <p className="text-3xl font-black mb-2">{distanceInfo.dist.toFixed(3)} KM</p>
              <p className="text-[10px] font-mono text-zinc-400 leading-relaxed">"{distanceInfo.analysis}"</p>
              <button onClick={() => {setRulerPoints([]); setDistanceInfo(null);}} className="mt-4 text-[9px] font-black text-[#FF3E00] uppercase underline">Reset Ruler</button>
           </div>
        )}
      </div>

      {/* FOOTER DATA STREAM */}
      <div className="absolute bottom-8 left-8 z-[1000] pointer-events-none">
         <div className="flex gap-4">
           {MOCK_ASSETS.slice(0, 2).map(asset => (
             <div key={asset.id} className="bg-black border-2 border-white p-3 flex items-center gap-4 shadow-[4px_4px_0px_rgba(255,255,255,0.1)]">
                <div className="w-2 h-2 bg-[#00FF41] animate-ping"></div>
                <div>
                  <p className="text-[9px] font-bold text-white uppercase">{asset.id} PING</p>
                  <p className="text-[8px] font-mono text-zinc-500">{asset.lat.toFixed(4)}, {asset.lng.toFixed(4)}</p>
                </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};

export default TrackingView;
