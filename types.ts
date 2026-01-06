
export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'active' | 'idle' | 'warning';
  lastUpdated: string;
  speed?: number;
  orderId?: string;
  milestone?: 'warehouse' | 'transit' | 'last-mile' | 'delivered';
}

export interface Geofence {
  id: string;
  name: string;
  points: [number, number][];
  type: 'security' | 'delivery' | 'restricted';
  radius: number;
}

export interface AnalyticsData {
  time: string;
  volume: number;
  latency: number;
}

export enum AppSection {
  TRACKING = 'tracking',
  ANALYTICS = 'analytics',
  GEOFENCING = 'geofencing',
  OPTIMIZATION = 'optimization',
  API = 'api',
  DEVELOPER_LAB = 'dev-lab'
}
