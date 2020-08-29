import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import SignUp from "../views/Signup.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
