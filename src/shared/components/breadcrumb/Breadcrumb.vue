<script setup lang="ts">
import { useBreadcrumbs } from "./composables/useBreadcrumbs";

const { breadcrumbs } = useBreadcrumbs();
</script>

<template>
  <UBreadcrumb :items="breadcrumbs">
    <template #separator>
      <span class="mx-2 text-muted">/</span>
    </template>
  </UBreadcrumb>
</template>
