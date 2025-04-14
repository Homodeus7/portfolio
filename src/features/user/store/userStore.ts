import type { User } from "@supabase/supabase-js";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
  }),

  actions: {
    setUser(user: User) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    },
  },

  getters: {
    isAuthenticated: (state) => !!state.user,
    userEmail: (state) => state.user?.email ?? "",
  },
});
