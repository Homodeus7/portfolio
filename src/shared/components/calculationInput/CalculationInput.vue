<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: number;
  name?: string;
  titleWidth?: number;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <div class="flex items-center gap-2">
    <span
      v-if="name"
      :style="`width: ${titleWidth ? titleWidth + 'px' : '80px'};`"
    >
      {{ name }}
    </span>
    <UButton
      @click="inputValue--"
      state="solid"
      color="error"
      size="md"
      icon="i-lucide-minus"
    />
    <UInput v-model="inputValue" />
    <UButton
      @click="inputValue++"
      state="solid"
      color="success"
      size="md"
      icon="i-lucide-plus"
    />
  </div>
</template>
