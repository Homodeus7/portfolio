<script lang="ts" setup>
import PageLayout from "@shared/layout/pageLayout/PageLayout.vue";
</script>

<template>
  <PageLayout title="Главная">
    <template #content>
      <div class="w-full flex items-center justify-center gap-4">
        <UButton color="neutral"> Кнопка на главной </UButton>
        <UButton color="neutral"> Кнопка на главной </UButton>
      </div>
    </template>
  </PageLayout>
</template>
