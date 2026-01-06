
import React from 'react';
import { Map, Activity, Shield, Code, Zap, Route, Terminal } from 'lucide-react';
import { AppSection, Geofence, Location } from './types';

export const NAVIGATION_ITEMS = [
  { id: AppSection.TRACKING, label: 'Live Tracking', icon: <Map size={20} /> },
  { id: AppSection.ANALYTICS, label: 'Analytics', icon: <Activity size={20} /> },
  { id: AppSection.GEOFENCING, label: 'Geofences', icon: <Shield size={20} /> },
  { id: AppSection.OPTIMIZATION, label: 'Optimization', icon: <Route size={20} /> },
  { id: AppSection.API, label: 'API & Docs', icon: <Code size={20} /> },
  { id: AppSection.DEVELOPER_LAB, label: 'Dev Sandbox', icon: <Terminal size={20} /> },
];

export const MOCK_ASSETS: Location[] = [
  { id: '1', name: 'Fleet-A-01', lat: 37.7749, lng: -122.4194, status: 'active', speed: 45, lastUpdated: 'Now', orderId: 'ORD-9921', milestone: 'last-mile' },
  { id: '2', name: 'Fleet-A-04', lat: 37.7833, lng: -122.4167, status: 'warning', speed: 12, lastUpdated: '2m ago', orderId: 'ORD-8812', milestone: 'transit' },
  { id: '3', name: 'Delivery-X', lat: 37.7694, lng: -122.4862, status: 'active', speed: 28, lastUpdated: '10s ago', orderId: 'ORD-7763', milestone: 'last-mile' },
  { id: '4', name: 'Van-Global', lat: 37.7394, lng: -122.4194, status: 'idle', speed: 0, lastUpdated: '15m ago', orderId: 'ORD-1102', milestone: 'warehouse' },
];

export const MOCK_GEOFENCES: Geofence[] = [
  { 
    id: 'gf-1', 
    name: 'Main Depot', 
    points: [[37.778, -122.422], [37.778, -122.416], [37.772, -122.416], [37.772, -122.422]] as [number, number][],
    type: 'security',
    radius: 450
  },
  { 
    id: 'gf-2', 
    name: 'Restricted Zone B', 
    points: [[37.765, -122.492], [37.775, -122.482], [37.765, -122.472]] as [number, number][],
    type: 'restricted',
    radius: 800
  },
];

export const MOCK_ROUTES = [
  { id: 'R1', name: 'Downtown Express', stops: 12, efficiency: '94%', time: '24m', status: 'optimal' },
  { id: 'R2', name: 'Westside Logistics', stops: 8, efficiency: '81%', time: '38m', status: 'review' },
  { id: 'R3', name: 'South Bay Hub', stops: 15, efficiency: '98%', time: '52m', status: 'optimal' },
];

export const MAP_TILES = {
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  light: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
};

export const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
