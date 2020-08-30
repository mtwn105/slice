<template>
  <div id="app" class="uk-background-primary">
    <nav class="uk-navbar-container uk-margin uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-left">
        <a class="uk-navbar-item uk-logo uk-light brand-name" href="#">Slice</a>
      </div>
      <div class="uk-navbar-right">
        <div class="uk-navbar-item">
          <form action="javascript:void(0)">
            <button
              v-if="$route.name == 'Login'"
              @click="$router.push({ path: '/signup' })"
              class="uk-button uk-button-default uk-light"
            >
              Signup
            </button>
            <button
              v-if="$route.name == 'Signup'"
              @click="$router.push({ path: '/login' })"
              class="uk-button uk-button-default uk-light"
            >
              Login
            </button>
            <div class="user-info">
              <h4 class="uk-text-bold user-name">{{ user.name }}</h4>

              <button
                v-if="loggedIn"
                @click="logout"
                class="uk-button uk-button-default uk-light"
              >
                Logout
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import UIkit from "uikit";
import { store, mutations } from "./store/store";

export default {
  computed: {
    loggedIn() {
      return store.loggedIn;
    },
    user() {
      return store.user;
    },
  },
  methods: {
    logout() {
      // Logout
      mutations.setLoggedIn(false);
      mutations.setUser(null);
      UIkit.notification("Logged Out Successfully.", { status: "success" });
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
#app {
  overflow-y: auto;
}
.user-info {
  display: flex;
}

.user-name {
  color: white;
  margin: 8px 20px;
}

.brand-name {
  color: white;
}

.login-section {
  align-content: center;
}
</style>
