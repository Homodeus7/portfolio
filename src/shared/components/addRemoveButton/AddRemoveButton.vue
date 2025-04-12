<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  index: number;
}

const props = defineProps<Props>();
const emits = defineEmits(["add", "remove"]);

const isFirst = computed(() => props.index === 0);
</script>

<template>
  <UButton
    @click="isFirst ? emits('add') : emits('remove', props.index)"
    :color="isFirst ? 'success' : 'error'"
    variant="solid"
    size="md"
    :icon="isFirst ? 'i-lucide-plus' : 'i-lucide-minus'"
  />
</template>
