import type { HousePlanModel } from "@pages/housePlan/model/HousePlanModel";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import { useHousePlan } from "./useHousePlan";

export function useHouseQuery(id: string, enabled: boolean) {
  const { getHousePlan } = useHousePlan();
  return useQuery({
    queryKey: ["house-plan", id],
    queryFn: () => getHousePlan(id),
    enabled: !!id && enabled,
    placeholderData: keepPreviousData,
  });
}

export function useCreateHouseMutation() {
  const { createHousePlan } = useHousePlan();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createHousePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["house-plans"] });
    },
  });
}

export function useUpdateHouseMutation() {
  const { updateHousePlan } = useHousePlan();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<HousePlanModel>;
    }) => updateHousePlan(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["house-plans"] });
      queryClient.invalidateQueries({ queryKey: ["house-plan", variables.id] });
    },
  });
}

export function useDeleteHouseMutation() {
  const { deleteHousePlan } = useHousePlan();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteHousePlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["house-plans"] });
    },
  });
}
