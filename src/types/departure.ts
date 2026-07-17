export interface Departure {
  id: number;
  bus_name: string;
  destination: string;
  departure_time: string;
  bus_type?: string | null;
  platform?: string | null;
}

export interface Destination {
  destination: string;
}

export interface Bus {
  bus_name: string;
}