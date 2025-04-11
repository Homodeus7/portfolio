<script setup lang="ts">
interface Props {
  title?: string | unknown
  hasTitleSlot?: boolean
  disabled?: boolean
  crumbList?: boolean
  delete?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <section class="p-10">
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
    <!-- Основной контент -->
    <slot name="content" />
    <slot />
  </section>
</template>
