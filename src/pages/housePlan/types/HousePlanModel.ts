import { EntranceModel } from "@features/entrances/types/EntrancesModel";

export interface HousePlanModel {
  id: string;
  name: string;
  user_id?: string;
  entrances: EntranceModel[];
  created_at: string;
  updated_at: string;
}
