<script setup lang="ts">
import { PageLayout } from "@shared/layouts";
import HousePlanDocsWidget from "@widgets/housePlanDocs/HousePlanDocsWidget.vue";
</script>

<template>
  <PageLayout title="House Plan Editor — Документация">
    <template #header-desc>
      <p class="text-lg text-gray-400">
        Интерфейс редактирования и создания планов домов с подъездами.
        Используются: <code>Vue 3</code>, <code>Vue Router</code>,
        <code>Vue Query</code>, <code>Supabase</code>, <code>Zod</code>,
        <code>Pinia</code>.
      </p>
    </template>

    <template #content>
      <div class="py-10">
        <HousePlanDocsWidget />
      </div>
    </template>
  </PageLayout>
</template>
