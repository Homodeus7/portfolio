<script setup lang="ts">
import { supabase } from "@app/api/supabase";
import PageLayout from "@shared/layout/pageLayout/PageLayout.vue";
import { useRouter } from "vue-router";

const router = useRouter();

(async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isAuthenticated = !!session?.user;

  setTimeout(() => {
    if (isAuthenticated) {
      router.replace({ name: "home" });
    } else {
      router.replace({ name: "login" });
    }
  }, 2000);
})();
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
