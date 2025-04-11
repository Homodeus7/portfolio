<script setup lang="ts">
import { useHousesQuery } from "@pages/housePlans/api/useHousePlansQuery";
import type { HousePlan } from "@pages/housePlans/types";
import { BaseTable } from "@shared/components";
import type { ColumnDef } from "@tanstack/vue-table";
import { ref } from "vue";

const page = ref(1);
const limit = 10;
const { data, isLoading } = useHousesQuery(page, limit);

const columns: ColumnDef<HousePlan>[] = [
  {
    accessorKey: "name",
    header: "Название",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "created_at",
    header: "Создано",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "updated_at",
    header: "Обновлено",
    cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
  },
  {
    accessorKey: "entrances",
    header: "Подъезды",
    cell: (info) => {
      const entrances = info.getValue() as unknown[];
      const count = entrances?.length ?? 0;

      const getLabel = (num: number) => {
        const mod10 = num % 10;
        const mod100 = num % 100;
        if (mod10 === 1 && mod100 !== 11) return "подъезд";
        if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
          return "подъезда";
        return "подъездов";
      };
      return `${count ? count : ""} ${getLabel(count)}`;
    },
  },
  {
    id: "actions",
    header: "Действия",
    cell: () => "",
  },
];
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-xl font-bold">Планы домов</h1>

    <BaseTable
      v-if="data?.data"
      :data="data.data"
      :columns="columns"
      :page="page"
      :total="data.total"
      :limit="limit"
    />

    <div v-else-if="isLoading" class="text-gray-500">Загрузка...</div>
  </div>
</template>
