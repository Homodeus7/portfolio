<script setup lang="ts">
import { useUserStore } from "@features/user/store/userStore";
import type { FormSubmitEvent } from "@nuxt/ui";
import { useSignInMutation } from "@pages/auth/model/useAuthQuery";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { authSchema, AuthSchema } from "./model/authSchema";
import AuthForm from "./ui/AuthForm.vue";

const state = reactive<Partial<AuthSchema>>({
  email: undefined,
  password: undefined,
});

const userStore = useUserStore();

const { mutate: login, isPending, data: userData } = useSignInMutation();
const toast = useToast();
const router = useRouter();

async function onSubmit(event: FormSubmitEvent<AuthSchema>) {
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
  <AuthForm
    :schema="authSchema"
    :state="state"
    :loading="isPending"
    button-text="Войти"
    redirect-text="Нет аккаунта?"
    redirect-link="/register"
    redirect-link-text="Зарегистрироваться"
    @submit="onSubmit"
  />
</template>
