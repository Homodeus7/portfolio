<script setup lang="ts">
import { useHousesQuery } from "@pages/housePlans/api/useHousePlansQuery";
import { columns } from "@pages/housePlans/table/columns";
import { BaseTable } from "@shared/components";
import PageLayout from "@shared/layouts/pageLayout/PageLayout.vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const page = ref(1);
const limit = 10;
const { data, isLoading } = useHousesQuery(page, limit);

const linkToCreate = () => {
  router.push(`/house-plans/create`);
};
</script>

<template>
  <PageLayout title="Планы домов">
    <template #header-content>
      <UButton color="success" variant="subtle" @click="linkToCreate">
        Создать план
      </UButton>
    </template>
    <template #content>
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
    </template>
  </PageLayout>
</template>
