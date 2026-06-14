export interface BusRoute {
  routeNo: string;
  name: string;
  from: string;
  to: string;
  stops: number;
  distanceKm: number;
  avgSpeedKmh: number;
  fareRs: number;
  zone: 'A' | 'B' | 'C';
  crowdPeak: 'Low' | 'Moderate' | 'High';
  crowdOffPeak: 'Low' | 'Moderate' | 'High';
  nightService: boolean;
  acBus: boolean;
}

export const busRoutes: BusRoute[] = [
  { routeNo: '14',  name: 'Connaught Place – Cyber City',    from: 'CP',          to: 'Cyber City',    stops: 12, distanceKm: 22, avgSpeedKmh: 18, fareRs: 18, zone: 'B', crowdPeak: 'Moderate', crowdOffPeak: 'Low',      nightService: false, acBus: false },
  { routeNo: '45',  name: 'ISBT – IGI Airport',              from: 'ISBT Kashmere Gate', to: 'IGI Airport', stops: 9,  distanceKm: 18, avgSpeedKmh: 22, fareRs: 25, zone: 'B', crowdPeak: 'High',     crowdOffPeak: 'Moderate', nightService: true,  acBus: false },
  { routeNo: '181', name: 'Nehru Place – Dwarka Sector 21',  from: 'Nehru Place', to: 'Dwarka Sec 21',  stops: 16, distanceKm: 28, avgSpeedKmh: 16, fareRs: 20, zone: 'C', crowdPeak: 'High',     crowdOffPeak: 'Moderate', nightService: false, acBus: false },
  { routeNo: '505', name: 'Lajpat Nagar – Noida Sector 62', from: 'Lajpat Nagar',to: 'Noida Sec 62',   stops: 14, distanceKm: 24, avgSpeedKmh: 17, fareRs: 22, zone: 'B', crowdPeak: 'High',     crowdOffPeak: 'Low',      nightService: false, acBus: false },
  { routeNo: '590', name: 'Saket – Gurugram Sector 14',     from: 'Saket',       to: 'Gurugram Sec 14',stops: 11, distanceKm: 20, avgSpeedKmh: 19, fareRs: 20, zone: 'B', crowdPeak: 'Moderate', crowdOffPeak: 'Low',      nightService: false, acBus: false },
  { routeNo: '732', name: 'Rohini – Karol Bagh',            from: 'Rohini Sec 3',to: 'Karol Bagh',     stops: 10, distanceKm: 14, avgSpeedKmh: 15, fareRs: 15, zone: 'A', crowdPeak: 'High',     crowdOffPeak: 'Moderate', nightService: false, acBus: false },
  { routeNo: 'AC1', name: 'Airport Express Shuttle',         from: 'New Delhi Stn',to: 'IGI T3',        stops: 5,  distanceKm: 20, avgSpeedKmh: 35, fareRs: 75, zone: 'B', crowdPeak: 'Low',      crowdOffPeak: 'Low',      nightService: true,  acBus: true  },
  { routeNo: 'AC2', name: 'CP – Gurugram Cyber Park',       from: 'CP',          to: 'Cyber Park Gurg',stops: 8,  distanceKm: 30, avgSpeedKmh: 28, fareRs: 55, zone: 'C', crowdPeak: 'Moderate', crowdOffPeak: 'Low',      nightService: false, acBus: true  },
  { routeNo: '801', name: 'Vasant Kunj – Lajpat Nagar',    from: 'Vasant Kunj', to: 'Lajpat Nagar',   stops: 8,  distanceKm: 12, avgSpeedKmh: 17, fareRs: 13, zone: 'A', crowdPeak: 'Moderate', crowdOffPeak: 'Low',      nightService: false, acBus: false },
  { routeNo: '620', name: 'Janakpuri – Rajouri Garden',     from: 'Janakpuri W', to: 'Rajouri Garden',  stops: 7,  distanceKm: 9,  avgSpeedKmh: 16, fareRs: 10, zone: 'A', crowdPeak: 'High',     crowdOffPeak: 'Moderate', nightService: false, acBus: false },
  { routeNo: '302', name: 'Pitampura – Chandni Chowk',      from: 'Pitampura',   to: 'Chandni Chowk',  stops: 13, distanceKm: 18, avgSpeedKmh: 14, fareRs: 18, zone: 'B', crowdPeak: 'High',     crowdOffPeak: 'High',     nightService: false, acBus: false },
  { routeNo: '419', name: 'Sarojini Nagar – INA',           from: 'Sarojini Nagar',to: 'INA Market',   stops: 5,  distanceKm: 6,  avgSpeedKmh: 13, fareRs: 10, zone: 'A', crowdPeak: 'Moderate', crowdOffPeak: 'Low',      nightService: false, acBus: false },
  { routeNo: '217', name: 'Preet Vihar – Pragati Maidan',   from: 'Preet Vihar', to: 'Pragati Maidan', stops: 9,  distanceKm: 11, avgSpeedKmh: 15, fareRs: 12, zone: 'A', crowdPeak: 'Moderate', crowdOffPeak: 'Low',      nightService: false, acBus: false },
  { routeNo: '335', name: 'Mukherjee Nagar – CP',           from: 'Mukherjee Nagar',to: 'CP',          stops: 10, distanceKm: 13, avgSpeedKmh: 16, fareRs: 15, zone: 'A', crowdPeak: 'High',     crowdOffPeak: 'Moderate', nightService: false, acBus: false },
  { routeNo: '460', name: 'Palam – Dwarka Mor',             from: 'Palam Village',to: 'Dwarka Mor',     stops: 6,  distanceKm: 8,  avgSpeedKmh: 18, fareRs: 10, zone: 'A', crowdPeak: 'Moderate', crowdOffPeak: 'Low',      nightService: false, acBus: false },
  { routeNo: '518', name: 'Mayur Vihar – Noida Sec 18',     from: 'Mayur Vihar Ph1',to: 'Noida Sec 18', stops: 8,  distanceKm: 12, avgSpeedKmh: 20, fareRs: 15, zone: 'B', crowdPeak: 'High',     crowdOffPeak: 'Moderate', nightService: false, acBus: false },
  { routeNo: '670', name: 'GTB Nagar – Azadpur',            from: 'GTB Nagar',   to: 'Azadpur',        stops: 7,  distanceKm: 9,  avgSpeedKmh: 14, fareRs: 10, zone: 'A', crowdPeak: 'Moderate', crowdOffPeak: 'Low',      nightService: false, acBus: false },
  { routeNo: '712', name: 'Uttam Nagar – Vikaspuri',        from: 'Uttam Nagar E',to: 'Vikaspuri',      stops: 5,  distanceKm: 7,  avgSpeedKmh: 16, fareRs: 10, zone: 'A', crowdPeak: 'High',     crowdOffPeak: 'Low',      nightService: false, acBus: false },
  { routeNo: 'AC5', name: 'CP – Sohna Road Gurugram',       from: 'CP',          to: 'Sohna Rd',        stops: 6,  distanceKm: 35, avgSpeedKmh: 32, fareRs: 65, zone: 'C', crowdPeak: 'Low',      crowdOffPeak: 'Low',      nightService: false, acBus: true  },
  { routeNo: '119', name: 'Sadar Bazar – Jahangirpuri',     from: 'Sadar Bazar', to: 'Jahangirpuri',    stops: 9,  distanceKm: 10, avgSpeedKmh: 13, fareRs: 12, zone: 'A', crowdPeak: 'High',     crowdOffPeak: 'Moderate', nightService: false, acBus: false },
  { routeNo: '225', name: 'Dilshad Garden – Shahdara',      from: 'Dilshad Garden',to: 'Shahdara',      stops: 6,  distanceKm: 8,  avgSpeedKmh: 15, fareRs: 10, zone: 'A', crowdPeak: 'Moderate', crowdOffPeak: 'Low',      nightService: false, acBus: false },
  { routeNo: '318', name: 'Kirti Nagar – Patel Nagar',      from: 'Kirti Nagar', to: 'Patel Nagar',     stops: 5,  distanceKm: 6,  avgSpeedKmh: 14, fareRs: 10, zone: 'A', crowdPeak: 'Moderate', crowdOffPeak: 'Low',      nightService: false, acBus: false },
  { routeNo: '422', name: 'Kalkaji – Defence Colony',       from: 'Kalkaji',     to: 'Defence Colony',  stops: 6,  distanceKm: 7,  avgSpeedKmh: 14, fareRs: 10, zone: 'A', crowdPeak: 'High',     crowdOffPeak: 'Moderate', nightService: false, acBus: false },
  { routeNo: '534', name: 'Wazirpur – Rajinder Nagar',      from: 'Wazirpur',    to: 'Rajinder Nagar',  stops: 7,  distanceKm: 9,  avgSpeedKmh: 15, fareRs: 10, zone: 'A', crowdPeak: 'Moderate', crowdOffPeak: 'Low',      nightService: false, acBus: false },
  { routeNo: '641', name: 'Dwarka Sec 10 – Uttam Nagar',    from: 'Dwarka Sec 10',to: 'Uttam Nagar',    stops: 6,  distanceKm: 8,  avgSpeedKmh: 16, fareRs: 10, zone: 'A', crowdPeak: 'High',     crowdOffPeak: 'Low',      nightService: false, acBus: false },
  { routeNo: '753', name: 'Badli – Adarsh Nagar',           from: 'Badli',       to: 'Adarsh Nagar',    stops: 5,  distanceKm: 6,  avgSpeedKmh: 13, fareRs: 10, zone: 'A', crowdPeak: 'Moderate', crowdOffPeak: 'Low',      nightService: false, acBus: false },
  { routeNo: '810', name: 'Mehrauli – Saket',               from: 'Mehrauli',    to: 'Saket',           stops: 4,  distanceKm: 5,  avgSpeedKmh: 14, fareRs: 10, zone: 'A', crowdPeak: 'Low',      crowdOffPeak: 'Low',      nightService: false, acBus: false },
  { routeNo: '866', name: 'Okhla – Jasola',                 from: 'Okhla Phase 1',to: 'Jasola',         stops: 4,  distanceKm: 5,  avgSpeedKmh: 15, fareRs: 10, zone: 'A', crowdPeak: 'Moderate', crowdOffPeak: 'Low',      nightService: false, acBus: false },
  { routeNo: '912', name: 'Shakarpur – Patparganj',         from: 'Shakarpur',   to: 'Patparganj',      stops: 6,  distanceKm: 7,  avgSpeedKmh: 14, fareRs: 10, zone: 'A', crowdPeak: 'High',     crowdOffPeak: 'Moderate', nightService: false, acBus: false },
  { routeNo: '981', name: 'Badarpur – Sarita Vihar',        from: 'Badarpur',    to: 'Sarita Vihar',    stops: 5,  distanceKm: 6,  avgSpeedKmh: 16, fareRs: 10, zone: 'A', crowdPeak: 'Low',      crowdOffPeak: 'Low',      nightService: false, acBus: false },
];
