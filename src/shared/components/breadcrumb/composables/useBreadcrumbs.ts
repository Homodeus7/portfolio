import type { BreadcrumbItem } from "@nuxt/ui";
import { computed } from "vue";
import { useRoute } from "vue-router";

export function useBreadcrumbs() {
  const route = useRoute();

  const breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const items: BreadcrumbItem[] = [{ label: "Домашняя", to: "/" }];

    for (const r of route.matched) {
      const metaBreadcrumb = r.meta.breadcrumb;

      if (!metaBreadcrumb) continue;

      const label =
        typeof metaBreadcrumb === "function"
          ? metaBreadcrumb(route)
          : metaBreadcrumb;

      const to = r.path.includes(":") ? route.fullPath : r.path;

      items.push({ label, to });
    }

    return items;
  });

  return { breadcrumbs };
}
