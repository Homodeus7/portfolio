import { supabase } from "@app/api/supabase";
import type { HousePlan } from "@pages/housePlans/types";

export function useHouses() {
  const getHouses = async ({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("house_plans")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      data: data as HousePlan[],
      total: count ?? 0,
    };
  };

  const getHouse = async (id: string) => {
    const { data, error } = await supabase
      .from("house_plans")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data as HousePlan;
  };

  const createHouse = async (
    house: Omit<HousePlan, "id" | "created_at" | "updated_at">
  ) => {
    const { data, error } = await supabase
      .from("house_plans")
      .insert(house)
      .select()
      .single();
    if (error) throw error;
    return data as HousePlan;
  };

  const updateHouse = async (
    id: string,
    updates: Partial<Omit<HousePlan, "id" | "created_at" | "user_id">>
  ) => {
    const { data, error } = await supabase
      .from("house_plans")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data as HousePlan;
  };

  const deleteHouse = async (id: string) => {
    const { error } = await supabase.from("house_plans").delete().eq("id", id);
    if (error) throw error;
  };

  return {
    getHouses,
    getHouse,
    createHouse,
    updateHouse,
    deleteHouse,
  };
}
