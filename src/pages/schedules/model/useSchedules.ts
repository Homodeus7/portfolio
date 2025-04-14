import { supabase } from "@app/api/supabase";
import type { ScheduleModel } from "@pages/schedule/model/ScheduleModel";

export function useSchedules() {
  const getHousePlans = async ({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }) => {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("schedules")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) throw error;

    return {
      data: data as ScheduleModel[],
      total: count ?? 0,
    };
  };

  return {
    getHousePlans,
  };
}
