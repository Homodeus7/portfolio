import { supabase } from "@app/api/supabase";
import type { HousePlanModel } from "@pages/housePlan/types/HousePlanModel";

export function useHousePlan() {
  const getHousePlan = async (id: string) => {
    const { data, error } = await supabase
      .from("house_plans")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data as HousePlanModel;
  };

  const createHousePlan = async (
    house: Omit<HousePlanModel, "id" | "created_at" | "updated_at">
  ) => {
    const { data, error } = await supabase
      .from("house_plans")
      .insert(house)
      .select()
      .single();
    if (error) throw error;
    return data as HousePlanModel;
  };

  const updateHousePlan = async (
    id: string,
    updates: Partial<Omit<HousePlanModel, "id" | "created_at" | "user_id">>
  ) => {
    const { data, error } = await supabase
      .from("house_plans")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as HousePlanModel;
  };

  const deleteHousePlan = async (id: string) => {
    const { error } = await supabase.from("house_plans").delete().eq("id", id);
    if (error) throw error;
  };

  return {
    getHousePlan,
    createHousePlan,
    updateHousePlan,
    deleteHousePlan,
  };
}
