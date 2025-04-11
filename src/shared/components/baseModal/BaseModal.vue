<script setup lang="ts">
const {
  title = "Модальное окно",
  description = "выполните действие",
  actionBtnName = "Отправить",
} = defineProps<{
  title?: string;
  description?: string;
  actionBtnName?: string;
}>();

const isOpen = defineModel<boolean>("open");
const emits = defineEmits(["onAction"]);

function closeModal() {
  isOpen.value = false;
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :title="title"
    :description="description"
    :ui="{ footer: 'justify-end' }"
  >
    <template #body>
      <slot name="body" />
    </template>

    <template #footer>
      <UButton
        label="Отмена"
        color="neutral"
        variant="outline"
        @click="closeModal"
      />
      <UButton
        :label="actionBtnName"
        color="neutral"
        @click="emits('onAction')"
      />
    </template>
  </UModal>
</template>
