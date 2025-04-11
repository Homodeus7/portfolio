<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { useSignUpMutation } from "@pages/auth/api/useAuthQuery";
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

const { mutate: registr, isPending } = useSignUpMutation();
const toast = useToast();
const router = useRouter();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  registr(
    { email: event.data.email, password: event.data.password },
    {
      onSuccess: () => {
        toast.add({
          title: "Успешно",
          description: "Письмо подтверждения отправлено на email.",
          color: "success",
        });
        router.push("/login");
      },
      onError: (err: any) => {
        toast.add({
          title: "Ошибка",
          description: err.message || "Ошибка регистрации",
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

    <UButton type="submit" :loading="isPending"> Зарегистрироваться </UButton>

    <p class="text-sm text-gray-500">
      Уже есть аккаунт?
      <RouterLink
        to="/login"
        class="text-primary underline hover:text-primary-600"
      >
        Войти
      </RouterLink>
    </p>
  </UForm>
</template>
