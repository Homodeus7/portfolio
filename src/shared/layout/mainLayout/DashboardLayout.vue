<script setup lang="ts">
import Breadcrumb from "@shared/components/breadcrumb/Breadcrumb.vue";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import Sidebar from "../sidebar/Sidebar.vue";

const isSidebarOpen = ref(false);

const toggleScrollLock = (lock: boolean) => {
  document.body.style.overflow = lock ? "hidden" : "";
};

watch(isSidebarOpen, (val) => {
  toggleScrollLock(val);
});

onMounted(() => {
  toggleScrollLock(isSidebarOpen.value);
});

onBeforeUnmount(() => {
  toggleScrollLock(false);
});
</script>
<template>
  <!-- Overlay for mobile -->
  <div
    v-if="isSidebarOpen"
    class="fixed inset-0 bg-black/50 z-40 md:hidden"
    @click="isSidebarOpen = false"
  />

  <div class="min-h-screen w-full">
    <header
      class="p-4 shadow border-b border-b-white/20 flex justify-between items-center md:justify-start"
    >
      <div class="flex md:ml-64 max-w-7xl mx-auto">
        <button
          @click="isSidebarOpen = !isSidebarOpen"
          class="text-2xl md:hidden mr-2"
        >
          <span class="i-lucide-menu" />
        </button>
        <h1 class="text-xl font-bold">Dashboard</h1>
      </div>
    </header>

    <div class="flex md:ml-64 max-w-7xl mx-auto">
      <!-- Sidebar -->
      <Sidebar
        class="bg-[#0f172b] fixed top-0 left-0 h-full w-64 shadow transform transition-transform duration-300 z-50 md:static md:translate-x-0"
        :class="{
          '-translate-x-full': !isSidebarOpen,
          'translate-x-0': isSidebarOpen,
        }"
      />

      <!-- Content Container -->
      <div class="pl-14 py-4 flex-1 w-full">
        <div class="flex flex-col gap-4 w-full h-full">
          <Breadcrumb />
          <main class="py-6">
            <router-view />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.i-lucide-menu::before {
  content: "\2630";
}
</style>
