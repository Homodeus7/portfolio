<script setup lang="ts">
interface Props {
  title?: string | unknown;
}

const props = defineProps<Props>();
</script>

<template>
  <section class="p-10 pr-48 flex flex-col min-h-full">
    <!-- Заголовок -->
    <header
      v-if="props.title"
      class="mb-4 flex flex-wrap gap-x-5 gap-y-2 justify-between items-center"
    >
      <h2 class="text-2xl font-bold">
        <slot name="title" />
        {{ props.title }}
      </h2>
      <!-- Слот с контентом -->
      <slot name="header-content" />
    </header>

    <!-- Контент -->
    <div class="flex-1">
      <slot name="content" />
    </div>

    <!-- Дополнительный слот -->
    <slot />
  </section>
</template>
