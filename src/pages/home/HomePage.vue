<script lang="ts" setup>
import PageLayout from "@shared/layout/pageLayout/PageLayout.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const linkTo = () => {
  router.push(`/house-plans`);
};
</script>

<template>
  <PageLayout title="Главная">
    <template #content>
      <div class="w-full flex items-center justify-center gap-4">
        <UButton color="neutral" @click="linkTo">
          Просмотр планов дома
        </UButton>
        <UButton color="neutral"> Просмотр графиков персонала </UButton>
      </div>
    </template>
  </PageLayout>
</template>
