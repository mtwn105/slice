import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import SignUp from "../views/Signup.vue";
import Dashboard from "../views/Dashboard.vue";
import AddFriend from "../views/AddFriend.vue";
import { mutations } from "../store/store";

Vue.use(VueRouter);

function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  //this is just an example. You will have to find a better or
  // centralised way to handle you localstorage data handling
  if (localStorage.getItem("isUserLoggedIn") == "true") isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    mutations.setLoggedIn(true);
    mutations.setUser({
      username: localStorage.getItem("username"),
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
    });
    mutations.setDevMode();
    next(); // allow to enter route
  } else {
    mutations.setLoggedIn(false);
    next("/login"); // go to '/login';
  }
}

const routes = [
  {
    path: "/",
    name: "home",
    beforeEnter: guardMyroute,
    component: Dashboard,
  },
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
  {
    path: "/dashboard",
    name: "Dashboard",
    beforeEnter: guardMyroute,
    component: Dashboard,
  },
  {
    path: "/add-a-friend",
    name: "AddFriend",
    beforeEnter: guardMyroute,
    component: AddFriend,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
