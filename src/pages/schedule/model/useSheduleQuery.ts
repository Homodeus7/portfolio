import type { ScheduleModel } from "@pages/schedule/model/ScheduleModel";

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import { useScedule } from "./useShedule";

export function useSceduleQuery(id: string, enabled: boolean) {
  const { getScedule } = useScedule();
  return useQuery({
    queryKey: ["schedule", id],
    queryFn: () => getScedule(id),
    enabled: !!id && enabled,
    placeholderData: keepPreviousData,
  });
}

export function useCreateSceduleMutation() {
  const { createScedule } = useScedule();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createScedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
}

export function useUpdateSceduleMutation() {
  const { updateScedule } = useScedule();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<ScheduleModel>;
    }) => updateScedule(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["schedule", variables.id] });
    },
  });
}

export function useDeleteSceduleMutation() {
  const { deleteScedule } = useScedule();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteScedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
}
