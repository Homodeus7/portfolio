import { useHouses } from "@pages/housePlans/api/useHousePlans";
import type { HousePlan } from "@pages/housePlans/types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import { Ref } from "vue";

export function useHousesQuery(page: Ref<number>, limit = 10) {
  const { getHouses } = useHouses();
  return useQuery({
    queryKey: ["houses", page],
    queryFn: () => getHouses({ page: page.value, limit }),
    placeholderData: keepPreviousData,
  });
}

export function useHouseQuery(id: string, enabled: boolean) {
  const { getHouse } = useHouses();
  return useQuery({
    queryKey: ["house", id],
    queryFn: () => getHouse(id),
    enabled: !!id && enabled,
    placeholderData: keepPreviousData,
  });
}

export function useCreateHouseMutation() {
  const { createHouse } = useHouses();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createHouse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["houses"] });
    },
  });
}

export function useUpdateHouseMutation() {
  const { updateHouse } = useHouses();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<HousePlan>;
    }) => updateHouse(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["houses"] });
      queryClient.invalidateQueries({ queryKey: ["house", variables.id] });
    },
  });
}

export function useDeleteHouseMutation() {
  const { deleteHouse } = useHouses();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteHouse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["houses"] });
    },
  });
}
