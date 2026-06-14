export interface RouteSegment {
  type: 'walk' | 'metro' | 'bus' | 'auto';
  label: string;
  duration?: string;
  crowd?: 'Low' | 'Moderate' | 'High';
  line?: string;
  stops?: number;
}

export interface Route {
  id: number;
  score: number;
  tags: string[];
  duration: string;
  price: number;
  timeRange: string;
  segments: RouteSegment[];
  safety: number;
  co2Saved: number;
  transfers: number;
  onTime: boolean;
  lateMinutes?: number;
  priceLocked: boolean;
  lockMinutes?: number;
}

export interface JourneyStep {
  id: number;
  location: string;
  time: string;
  description: string;
  safety?: number;
  segment?: RouteSegment;
}

export const mockRoutes: Route[] = [
  {
    id: 1,
    score: 94,
    tags: ['Fastest'],
    duration: '48 min',
    price: 62,
    timeRange: '9:15 AM - 10:03 AM',
    segments: [
      { type: 'walk', label: 'Walk' },
      { type: 'metro', label: 'Metro', duration: '17 min', line: 'Yellow Line' },
      { type: 'bus', label: 'Bus', duration: '8 min', crowd: 'Moderate' },
      { type: 'walk', label: 'Walk' },
    ],
    safety: 92,
    co2Saved: 2.8,
    transfers: 2,
    onTime: true,
    priceLocked: true,
    lockMinutes: 9,
  },
  {
    id: 2,
    score: 91,
    tags: ['Cheapest'],
    duration: '52 min',
    price: 48,
    timeRange: '9:18 AM - 10:10 AM',
    segments: [
      { type: 'walk', label: 'Walk' },
      { type: 'bus', label: 'Bus', duration: '35 min', crowd: 'Low' },
      { type: 'walk', label: 'Walk' },
    ],
    safety: 78,
    co2Saved: 4.1,
    transfers: 1,
    onTime: true,
    priceLocked: true,
    lockMinutes: 10,
  },
  {
    id: 3,
    score: 87,
    tags: ['Eco'],
    duration: '44 min',
    price: 55,
    timeRange: '9:20 AM - 10:04 AM',
    segments: [
      { type: 'walk', label: 'Walk' },
      { type: 'metro', label: 'Metro', duration: '22 min', line: 'Yellow Line' },
      { type: 'walk', label: 'Walk' },
    ],
    safety: 85,
    co2Saved: 1.2,
    transfers: 1,
    onTime: false,
    lateMinutes: 3,
    priceLocked: true,
    lockMinutes: 8,
  },
];

export const mockJourneySteps: JourneyStep[] = [
  {
    id: 1,
    location: 'Connaught Place',
    time: '9:15 AM',
    description: 'Starting point',
  },
  {
    id: 2,
    location: 'Rajiv Chowk Metro',
    time: '9:18 AM',
    description: '3 min walk',
    safety: 90,
    segment: { type: 'walk', label: 'Walk' },
  },
  {
    id: 3,
    location: 'HRC Metro Station',
    time: '9:35 AM',
    description: 'Metro Yellow Line - 17 min, 6 stops',
    safety: 85,
    segment: { type: 'metro', label: 'Metro', line: 'Yellow Line' },
  },
  {
    id: 4,
    location: 'Sikanderpur Bus Stop',
    time: '9:52 AM',
    description: 'Bus 14 - 8 min',
    safety: 78,
    segment: { type: 'bus', label: 'Bus' },
  },
  {
    id: 5,
    location: 'Cyber City',
    time: '10:03 AM',
    description: 'Destination',
  },
];

export const weeklyCo2Data = [
  { day: 'M', value: 0.3 },
  { day: 'T', value: 0.5 },
  { day: 'W', value: 0.8 },
  { day: 'T', value: 0.4 },
  { day: 'F', value: 0.6 },
  { day: 'S', value: 1.1 },
  { day: 'S', value: 0.5 },
];

export const preferenceOptions = [
  'Fastest',
  'Cheapest',
  'Eco-Friendly',
  'Women Safe',
  'Accessible',
  'Least Transfers',
];
