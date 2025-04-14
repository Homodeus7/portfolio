<script setup lang="ts">
import { useUserStore } from "@features/user/store/userStore";
import type { FormSubmitEvent } from "@nuxt/ui";
import { useSignInMutation } from "@pages/auth/api/useAuthQuery";
import { reactive } from "vue";
import { useRouter } from "vue-router";

import * as z from "zod";

const passwordRequirements = z
  .string()
  .min(8, "Минимум 8 символов")
  .regex(/[a-z]/, "Минимум одна строчная буква")
  .regex(/[A-Z]/, "Минимум одна заглавная буква")
  .regex(/[0-9]/, "Минимум одна цифра")
  .regex(/[^A-Za-z0-9]/, "Минимум один специальный символ");

const schema = z.object({
  email: z.string().email("Невалидный email"),
  password: passwordRequirements,
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

const userStore = useUserStore();

const { mutate: login, isPending, data: userData } = useSignInMutation();
const toast = useToast();
const router = useRouter();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  login(
    { email: event.data.email, password: event.data.password },
    {
      onSuccess: () => {
        toast.add({
          title: "Успешно",
          description: "Вы вошли",
          color: "success",
        });
        router.push("/");
        if (userData.value?.user) {
          userStore.setUser(userData.value?.user);
        }
      },
      onError: (err: any) => {
        toast.add({
          title: "Ошибка",
          description: err.message,
          color: "error",
        });
      },
    }
  );
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>

    <UFormField label="Пароль" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UButton type="submit" :loading="isPending"> Войти </UButton>

    <p class="text-sm text-gray-500">
      Нет аккаунта?
      <RouterLink
        to="/register"
        class="text-primary underline hover:text-primary-600"
      >
        Зарегистрироваться
      </RouterLink>
    </p>
  </UForm>
</template>
