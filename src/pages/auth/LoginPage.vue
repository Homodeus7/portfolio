<script setup lang="ts">
import { useUserStore } from "@features/user/store/userStore";
import type { FormSubmitEvent } from "@nuxt/ui";
import { useSignInMutation } from "@pages/auth/api/useAuthQuery";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { authSchema, AuthSchema } from "./schema/authSchema";

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
