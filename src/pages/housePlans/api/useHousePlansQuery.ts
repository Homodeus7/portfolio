import { useHousePlans } from "@pages/housePlans/api/useHousePlans";
import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { Ref } from "vue";

export function useHousesQuery(page: Ref<number>, limit = 10) {
  const { getHousePlans } = useHousePlans();
  return useQuery({
    queryKey: ["house-plans", page],
    queryFn: () => getHousePlans({ page: page.value, limit }),
    placeholderData: keepPreviousData,
  });
}
