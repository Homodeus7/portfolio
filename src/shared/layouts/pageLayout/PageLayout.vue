<script setup lang="ts">
interface Props {
  title?: string | unknown;
}

const props = defineProps<Props>();
</script>

<template>
  <section class="flex flex-col min-h-full">
    <!-- Заголовок -->
    <header
      v-if="props.title"
      class="flex flex-col gap-5 pb-5 border-b border-b-white/20"
    >
      <div
        lass="mb-4 flex flex-wrap gap-x-5 gap-y-2 justify-between items-center"
      >
        <h2 class="text-2xl font-bold">
          <slot name="title" />
          {{ props.title }}
        </h2>
        <!-- Слот с кнопками -->
        <slot name="header-action" />
      </div>
      <!-- Слот с описанием -->
      <slot name="header-desc" />
    </header>

    <!-- Контент -->
    <div class="flex-1">
      <slot name="content" />
    </div>

    <!-- Дополнительный слот -->
    <slot />
  </section>
</template>
