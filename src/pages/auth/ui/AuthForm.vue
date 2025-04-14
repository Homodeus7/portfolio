<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import type { AuthSchema } from "../model/authSchema";

const props = defineProps<{
  schema: any;
  state: Partial<AuthSchema>;
  loading: boolean;
  buttonText: string;
  redirectText: string;
  redirectLink: string;
  redirectLinkText: string;
}>();

const emit = defineEmits<{
  (e: "submit", event: FormSubmitEvent<AuthSchema>): void;
}>();
</script>

<template>
  <UForm
    :schema="props.schema"
    :state="props.state"
    class="space-y-4"
    @submit="(e) => emit('submit', e)"
  >
    <UFormField label="Email" name="email">
      <UInput v-model="props.state.email" />
    </UFormField>

    <UFormField label="Пароль" name="password">
      <UInput v-model="props.state.password" type="password" />
    </UFormField>

    <UButton type="submit" :loading="props.loading">
      {{ props.buttonText }}
    </UButton>

    <p class="text-sm text-gray-500">
      {{ props.redirectText }}
      <RouterLink
        :to="props.redirectLink"
        class="text-primary underline hover:text-primary-600"
      >
        {{ props.redirectLinkText }}
      </RouterLink>
    </p>
  </UForm>
</template>
