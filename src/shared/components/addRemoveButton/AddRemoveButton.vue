<script lang="ts" setup>
interface Props {
  index: number;
}

const props = defineProps<Props>();
const emits = defineEmits(["add", "remove"]);
</script>

<template>
  <UButton
    v-if="props.index === 0"
    @click="emits('add')"
    color="success"
    variant="solid"
    size="md"
    icon="i-lucide-plus"
  />

  <UButton
    v-if="props.index > 0"
    @click="emits('remove', props.index)"
    color="error"
    variant="solid"
    size="md"
    icon="i-lucide-minus"
  />
</template>
