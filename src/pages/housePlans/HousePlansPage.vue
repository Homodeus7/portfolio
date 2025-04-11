<script setup lang="ts">
import { useHousesQuery } from "@pages/housePlans/api/useHousePlansQuery";
import { columns } from "@pages/housePlans/table/columns";
import { BaseTable } from "@shared/components";
import { ref } from "vue";

const page = ref(1);
const limit = 10;
const { data, isLoading } = useHousesQuery(page, limit);

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
      is-row-link
    />

    <div v-else-if="isLoading" class="text-gray-500">Загрузка...</div>
  </div>
</template>
