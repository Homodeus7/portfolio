import { supabase } from "@app/api/supabase";
import { LoginPage, RegisterPage } from "@pages/auth";
import { HomePage } from "@pages/home";
import { HousePlanPage } from "@pages/housePlan";
import { useHousePlanTitleСrumbStore } from "@pages/housePlan/store/housePlanTitleСrumbStore";
import { HousePlansPage } from "@pages/housePlans";
import { NotFoundPage } from "@pages/notFound";
import { AuthLayout, DashboardLayout } from "@shared/layouts";
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalizedLoaded,
} from "vue-router";

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
        meta: { requiresAuth: true, breadcrumb: "Список планов домов" },
        children: [
          {
            path: "",
            name: "house-plans",
            component: HousePlansPage,
          },
          {
            path: "create",
            name: "create-house-plan",
            component: HousePlanPage,
            meta: { breadcrumb: "Создание плана дома" },
          },
          {
            path: ":id",
            name: "house-plan",
            component: HousePlanPage,
            meta: {
              breadcrumb: (route: RouteLocationNormalizedLoaded) => {
                const { getHousePlanTitle } = useHousePlanTitleСrumbStore();
                return (
                  `Редактирование плана дома ${getHousePlanTitle(
                    route.params.id as string
                  )}` || "Загрузка..."
                );
              },
            },
          },
        ],
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
