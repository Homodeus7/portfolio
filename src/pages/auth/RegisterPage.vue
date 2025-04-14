<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { useSignUpMutation } from "@pages/auth/api/useAuthQuery";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { authSchema, AuthSchema } from "./schema/authSchema";

const state = reactive<Partial<AuthSchema>>({
  email: undefined,
  password: undefined,
});

const { mutate: registr, isPending } = useSignUpMutation();
const toast = useToast();
const router = useRouter();

async function onSubmit(event: FormSubmitEvent<AuthSchema>) {
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
  <UForm
    :schema="authSchema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
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
