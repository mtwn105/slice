<template>
  <div class="login">
    <div>
      <div
        class="uk-card uk-card-default uk-card-hover uk-card-body uk-align-center uk-animation-scale-up"
      >
        <div class="uk-card-header">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand">
              <h3 class="uk-card-title uk-margin-remove-bottom">Login</h3>
              <p>Split your bills now!</p>
            </div>
          </div>
        </div>

        <div class="uk-card-body">
          <div v-if="showError" class="uk-alert-danger" uk-alert>
            <p>
              {{ errorMessage }}
            </p>
          </div>

          <form class="uk-form-stacked uk-dark uk-align-center">
            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >Username</label
              >
              <div class="uk-form-controls uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: user"></span>
                <input
                  v-model="username"
                  class="uk-input uk-width-1-1"
                  type="text"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >Password</label
              >
              <div class="uk-form-controls uk-width-1-1 uk-inline">
                <span class="uk-form-icon" uk-icon="icon: lock"></span>
                <input
                  v-model="password"
                  class="uk-input uk-width-1-1"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </form>

          <button
            @click="login"
            class="uk-button uk-button-large uk-button-primary uk-align-center"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      showError: false,
      errorMessage: "",
    };
  },
  methods: {
    login() {
      this.showError = false;
      this.errorMessage = "";

      const user = {
        username: this.username,
        password: this.password,
      };

      console.log(user);

      const loginUrl = "http://localhost:8000/auth/login";

      fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((response) => {
        response.json().then((json) => {
          if (json.error) {
            this.showError = true;
            this.errorMessage = json.error;
          } else {
            console.log(json);
            localStorage.setItem("isUserLoggedIn", "true");
            localStorage.setItem("username", json.username);
            localStorage.setItem("token", json.token);
          }
        });
      });
    },
  },
};
</script>

<style lang="scss">
.uk-card {
  width: 25rem;
  max-width: 90vw;
}
.login-section {
  align-content: center;
}
</style>
