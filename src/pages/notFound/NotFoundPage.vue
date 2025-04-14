<script setup lang="ts">
import { useUserStore } from "@features/user/store/userStore";
import PageLayout from "@shared/layouts/pageLayout/PageLayout.vue";
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const redirect = () => {
  setTimeout(() => {
    if (userStore.isAuthenticated) {
      router.replace({ name: "home" });
    } else {
      router.replace({ name: "login" });
    }
  }, 2000);
};

onMounted(() => {
  redirect();
});

watch(
  () => userStore.isAuthenticated,
  () => {
    redirect();
  }
);
</script>

<template>
  <PageLayout>
    <template #content>
      <div class="w-full min-h-max flex items-center justify-center">
        <div class="flex flex-col gap-8 text-center">
          <h1 class="text-4xl font-bold">404 - Page Not Found</h1>
          <p class="text-lg text-gray-500 mt-2">Redirecting...</p>
        </div>
      </div>
    </template>
  </PageLayout>
</template>
