import { defineStore } from "pinia";

export const useHousePlanTitleСrumbStore = defineStore(
  "house-plan-title-crumb",
  {
    state: () => ({
      housePlanTitles: {} as Record<string, string>,
    }),
    actions: {
      setHousePlanTitle(id: string, title: string) {
        this.housePlanTitles[id] = title;
      },
      getHousePlanTitle(id: string): string | undefined {
        return this.housePlanTitles[id];
      },
    },
  }
);
