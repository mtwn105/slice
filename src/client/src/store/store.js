import Vue from "vue";

export const store = Vue.observable({
  loggedIn: false,
  user: {
    userId: "",
    username: "",
    email: "",
    name: "",
  },
  prodMode: true,
});

export const mutations = {
  setDevMode() {
    store.prodMode = false;
  },
  setLoggedIn(value) {
    store.loggedIn = value;
  },
  setUser(user) {
    if (user) {
      store.user.userId = user.userId;
      store.user.username = user.username;
      store.user.email = user.email;
      store.user.name = user.name;
    } else {
      store.user.userId = "";
      store.user.username = "";
      store.user.email = "";
      store.user.name = "";
    }
  },
};
