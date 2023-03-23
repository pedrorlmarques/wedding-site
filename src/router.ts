import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/",
    name: "Invitation",
    meta: {
      requiresAuth: true,
    },
    component: () => import("@/views/Invitation.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("@/views/ForgotPassword.vue"),
  },
  {
    path: "/email-verification",
    name: "EmailConfirmation",
    component: () => import("@/views/EmailConfirmation.vue"),
  },
  {
    path: "/recover-password",
    name: "RecoverPassword",
    component: () => import("@/views/RecoverPassword.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn() && to.meta.requiresAuth) {
    return { name: "Login" };
  }
});

export default router;
