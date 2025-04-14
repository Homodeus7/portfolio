<script setup lang="ts">
import { computed } from "vue";

const model = defineModel<number>({ default: 1 });

interface Props {
  name?: string;
  titleWidth?: number;
  min?: number;
  max?: number;
}
const props = defineProps<Props>();

const min = computed(() => props.min ?? 1);
const max = computed(() => props.max ?? 20);

const inputValue = computed({
  get: () => model.value,
  set: (val) => {
    const num = Number(val);

    if (isNaN(num)) return;

    const clamped = Math.min(Math.max(num, min.value), max.value);
    model.value = clamped;
  },
});
</script>

<template>
  <div class="flex items-center gap-2">
    <span
      v-if="props.name"
      :style="`width: ${props.titleWidth ? props.titleWidth + 'px' : '80px'};`"
    >
      {{ props.name }}
    </span>
    <UButton
      @click="inputValue--"
      state="solid"
      color="error"
      size="md"
      icon="i-lucide-minus"
    />
    <div class="w-10">
      <UInput v-model.number="inputValue" type="number" variant="soft" />
    </div>
    <UButton
      @click="inputValue++"
      state="solid"
      color="success"
      size="md"
      icon="i-lucide-plus"
    />
  </div>
</template>

<style scoped>
:deep(input[type="number"]) {
  -moz-appearance: textfield;
  text-align: center;
}

:deep(input[type="number"]::-webkit-inner-spin-button),
:deep(input[type="number"]::-webkit-outer-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}
</style>
