<template>
  <div class="signup">
    <div>
      <div
        class="uk-card uk-card-default uk-card-hover uk-card-body uk-align-center uk-animation-scale-up"
      >
        <div class="uk-card-header">
          <div class="uk-grid-small uk-flex-middle" uk-grid>
            <div class="uk-width-expand">
              <h3 class="uk-card-title uk-margin-remove-bottom">Signup</h3>
              <p>Start Spliting bills now!</p>
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
              <label class="uk-form-label" for="form-stacked-text">Name</label>
              <div class="uk-form-controls uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: pencil"></span>
                <input
                  v-model="name"
                  class="uk-input uk-width-1-1"
                  type="text"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">Email</label>
              <div class="uk-form-controls uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: mail"></span>
                <input
                  v-model="email"
                  class="uk-input uk-width-1-1"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
            </div>

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

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >Confirm Password</label
              >
              <div class="uk-form-controls uk-width-1-1 uk-inline">
                <span class="uk-form-icon" uk-icon="icon: lock"></span>
                <input
                  v-model="confirmPassword"
                  class="uk-input uk-width-1-1"
                  type="password"
                  placeholder="Re-Enter your password"
                />
              </div>
            </div>
          </form>

          <button
            @click="signup"
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
      name: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      showError: false,
      errorMessage: "",
    };
  },
  methods: {
    signup() {
      this.showError = false;
      this.errorMessage = "";

      if (this.password != this.confirmPassword) {
        this.showError = true;
        this.errorMessage = "Passwords does not match";
        return;
      }

      const user = {
        username: this.username,
        name: this.name,
        email: this.email,
        password: this.password,
      };

      console.log(user);

      const signupUrl = "http://localhost:8000/auth/signup";

      fetch(signupUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((response) => {
        response.json().then((json) => {
          if (json.error) {
            this.showError = true;
            this.errorMessage = json.message;
          } else {
            console.log(json);
            this.$router.push("/login");
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
.signup-section {
  align-content: center;
}
</style>
