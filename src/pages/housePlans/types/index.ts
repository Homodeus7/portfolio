export interface Entrance {
  name?: string;
  floors: number;
  premises: number;
  firstApartmentNumber: number;
  lastApartmentNumber?: number;
}

export interface HousePlan {
  id: string;
  name: string;
  user_id?: string;
  entrances: Entrance[];
  created_at: string;
  updated_at: string;
}
