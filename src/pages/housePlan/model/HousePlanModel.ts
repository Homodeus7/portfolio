import { EntranceModel } from "@features/entrances/model/EntrancesModel";

export interface HousePlanModel {
  id: string;
  name: string;
  user_id?: string;
  entrances: EntranceModel[];
  created_at: string;
  updated_at: string;
}
