<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { useSignUpMutation } from "@pages/auth/model/useAuthQuery";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { authSchema, AuthSchema } from "./model/authSchema";
import AuthForm from "./ui/AuthForm.vue";

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
  <AuthForm
    :schema="authSchema"
    :state="state"
    :loading="isPending"
    button-text="Зарегистрироваться"
    redirect-text="Уже есть аккаунт?"
    redirect-link="/login"
    redirect-link-text="Войти"
    @submit="onSubmit"
  />
</template>
