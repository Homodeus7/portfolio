import { supabase } from "@app/api/supabase";
import { ScheduleModel } from "../model/ScheduleModel";

export function useScedule() {
  const getScedule = async (id: string) => {
    const { data, error } = await supabase
      .from("schedules")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data as ScheduleModel;
  };

  const createScedule = async (
    house: Omit<ScheduleModel, "id" | "created_at" | "updated_at">
  ) => {
    const { data, error } = await supabase
      .from("house_plans")
      .insert(house)
      .select()
      .single();
    if (error) throw error;
    return data as ScheduleModel;
  };

  const updateScedule = async (
    id: string,
    updates: Partial<Omit<ScheduleModel, "id" | "created_at" | "user_id">>
  ) => {
    const { data, error } = await supabase
      .from("house_plans")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as ScheduleModel;
  };

  const deleteScedule = async (id: string) => {
    const { error } = await supabase.from("house_plans").delete().eq("id", id);
    if (error) throw error;
  };

  return {
    getScedule,
    createScedule,
    updateScedule,
    deleteScedule,
  };
}
