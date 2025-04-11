import { supabase } from "@app/api/supabase";
import { LoginPage, RegisterPage } from "@pages/auth";
import { HomePage } from "@pages/home";
import { HousePlanPage } from "@pages/housePlan";
import { HousePlansPage } from "@pages/housePlans";
import { NotFoundPage } from "@pages/notFound";
import { AuthLayout, DashboardLayout } from "@shared/layout";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: "/register",
        name: "register",
        component: RegisterPage,
      },
      {
        path: "/login",
        name: "login",
        component: LoginPage,
      },
    ],
    meta: { isPublic: true },
  },
  {
    path: "/",
    component: DashboardLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: HomePage,
        meta: { requiresAuth: true },
      },
      {
        path: "/house-plans",
        name: "house-plans",
        component: HousePlansPage,
        meta: { requiresAuth: true },
      },
      {
        path: "/house-plans/:id",
        name: "house-plan",
        component: HousePlanPage,
        meta: { requiresAuth: true },
      },
      {
        path: "/house-plans/create",
        name: "create-house-plan",
        component: HousePlanPage,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
    meta: { isPublic: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isAuthenticated = !!session?.user;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else if (
    (to.name === "login" || to.name === "register") &&
    isAuthenticated
  ) {
    next({ name: "home" });
  } else {
    next();
  }
});

export default router;
