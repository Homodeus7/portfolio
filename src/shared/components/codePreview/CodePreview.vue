<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps<{
  code: string;
  language?: string;
}>();

const codeEl = ref<HTMLElement | null>(null);
const codeContainer = ref<HTMLElement | null>(null);

const expanded = ref(false);
const copied = ref(false);

const { height: blockHeight } = useElementSize(codeContainer);
const { height: preHight } = useElementSize(codeEl);

const isOverflowing = computed(() => {
  return expanded.value || preHight.value > blockHeight.value;
});

const copyToClipboard = () => {
  navigator.clipboard.writeText(props.code).then(() => {
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  });
};

const highlight = () => {
  if (codeEl.value) hljs.highlightElement(codeEl.value);
};

onMounted(highlight);
watch(() => props.code, highlight);
</script>

<template>
  <div
    ref="codeContainer"
    class="relative bg-[#0d1117] rounded-sm text-sm overflow-hidden border border-[#2c2f44]"
  >
    <pre
      :class="{ 'max-h-64 overflow-y-auto': !expanded }"
      class="transition-all duration-300 overflow-auto"
    >
      <code :class="language" ref="codeEl" class="!m-0 !p-0">{{ code }}</code>
    </pre>

    <!-- Expand/Collapse -->
    <UButton
      v-if="isOverflowing"
      color="primary"
      variant="subtle"
      class="absolute bottom-2 left-1/2 -translate-x-1/2 min-w-36"
      @click="expanded = !expanded"
      :icon="expanded ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
    >
      {{ expanded ? "Collapse code" : "Expand code" }}
    </UButton>

    <!-- Copy -->
    <UButton
      color="primary"
      variant="subtle"
      class="absolute top-2 right-2"
      @click="copyToClipboard"
      :icon="copied ? '' : 'i-lucide-copy'"
    >
      {{ copied ? "Copied!" : "" }}
    </UButton>
  </div>
</template>

<style scoped>
pre {
  padding: 1rem;
  font-family: "Fira Code", monospace;
}
</style>
