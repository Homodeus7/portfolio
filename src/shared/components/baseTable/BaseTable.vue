<script setup lang="ts" generic="T">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  type ColumnDef,
} from "@tanstack/vue-table";
import { computed } from "vue";

const props = defineProps<{
  data: T[];
  columns: ColumnDef<T, any>[];
  page?: number;
  limit?: number;
  total?: number;
}>();

const emit = defineEmits(["update:page"]);

const totalPages = computed(() =>
  props.total && props.limit ? Math.ceil(props.total / props.limit) : 1
);

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
});
</script>

<template>
  <div class="overflow-x-auto border rounded-lg space-y-2">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :colspan="header.colSpan"
            class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase"
          >
            <div v-if="!header.isPlaceholder">
              <FlexRender
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          class="hover:bg-gray-50 transition"
        >
          <td
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            class="px-4 py-3 whitespace-nowrap text-sm text-gray-700"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="totalPages > 1"
      class="flex items-center justify-center gap-2 py-2"
    >
      <button
        class="px-3 py-1 rounded border"
        :disabled="props.page === 1"
        @click="emit('update:page', (props.page ?? 1) - 1)"
      >
        Назад
      </button>

      <span class="text-sm">Страница {{ props.page }} из {{ totalPages }}</span>

      <button
        class="px-3 py-1 rounded border"
        :disabled="props.page === totalPages"
        @click="emit('update:page', (props.page ?? 1) + 1)"
      >
        Далее
      </button>
    </div>
  </div>
</template>
