import { useHousePlans } from "@pages/housePlans/model/useHousePlans";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { Ref } from "vue";

export function useSchedulesQuery(page: Ref<number>, limit = 10) {
  const { getHousePlans } = useHousePlans();
  return useQuery({
    queryKey: ["schedules", page],
    queryFn: () => getHousePlans({ page: page.value, limit }),
    placeholderData: keepPreviousData,
  });
}
