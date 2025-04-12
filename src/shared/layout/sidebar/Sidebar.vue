<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { ref } from "vue";

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "Links",
      type: "label",
    },
    {
      label: "Guide",
      icon: "i-lucide-book-open",
      children: [
        {
          label: "Introduction",
          description: "Fully styled and customizable components for Nuxt.",
          icon: "i-lucide-house",
        },
        {
          label: "Installation",
          description:
            "Learn how to install and configure Nuxt UI in your application.",
          icon: "i-lucide-cloud-download",
        },
        {
          label: "Icons",
          icon: "i-lucide-smile",
          description:
            "You have nothing to do, @nuxt/icon will handle it automatically.",
        },
        {
          label: "Colors",
          icon: "i-lucide-swatch-book",
          description:
            "Choose a primary and a neutral color from your Tailwind CSS theme.",
        },
        {
          label: "Theme",
          icon: "i-lucide-cog",
          description:
            "You can customize components by using the `class` / `ui` props or in your app.config.ts.",
        },
      ],
    },
    {
      label: "Composables",
      icon: "i-lucide-database",
      children: [
        {
          label: "defineShortcuts",
          icon: "i-lucide-file-text",
          description: "Define shortcuts for your application.",
          to: "/composables/define-shortcuts",
        },
        {
          label: "useOverlay",
          icon: "i-lucide-file-text",
          description: "Display a modal/slideover within your application.",
          to: "/composables/use-overlay",
        },
        {
          label: "useToast",
          icon: "i-lucide-file-text",
          description: "Display a toast within your application.",
          to: "/composables/use-toast",
        },
      ],
    },
    {
      label: "Components",
      icon: "i-lucide-box",
      to: "/components",
      active: true,
      defaultOpen: true,
      children: [
        {
          label: "Планы домов",
          icon: "i-lucide-house-plus",
          description: "Use NuxtLink with superpowers.",
          to: "/house-plans",
        },
        {
          label: "Графики",
          icon: "i-lucide-calendar-range",
          description: "Display a modal within your application.",
          to: "/components/modal",
        },
      ],
    },
  ],
  [
    {
      label: "GitHub",
      icon: "i-simple-icons-github",
      badge: "1.2k",
      to: "https://github.com/Homodeus7/portfolio_vue_type_script_nuxt_ui",
      target: "_blank",
    },
    {
      label: "Help",
      icon: "i-lucide-circle-help",
      disabled: true,
    },
  ],
]);
</script>

<template>
  <UNavigationMenu
    orientation="vertical"
    :items="items"
    class="data-[orientation=vertical]:w-48"
  />
</template>
