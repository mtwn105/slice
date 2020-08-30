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
                  :class="{
                    'uk-form-danger':
                      (!$v.name.required || !$v.name.minLength) &&
                      formSubmitted,
                  }"
                  v-model.trim="$v.name.$model"
                  class="uk-input uk-width-1-1"
                  type="text"
                  placeholder="Enter your name"
                />
              </div>
              <small
                class="error-text uk-form-help-block "
                v-if="!$v.name.required && formSubmitted"
              >
                Name is required
              </small>
              <small
                class="error-text uk-form-help-block"
                v-if="!$v.name.minLength && formSubmitted"
              >
                Name should have at least 4 characters
              </small>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text">Email</label>
              <div class="uk-form-controls uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: mail"></span>
                <input
                  :class="{
                    'uk-form-danger':
                      (!$v.email.required ||
                        !$v.email.minLength ||
                        !$v.email.email) &&
                      formSubmitted,
                  }"
                  v-model.trim="$v.email.$model"
                  class="uk-input uk-width-1-1"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <small
                class="error-text uk-form-help-block "
                v-if="!$v.email.required && formSubmitted"
              >
                Email is required
              </small>
              <small
                class="error-text uk-form-help-block"
                v-if="!$v.email.minLength && formSubmitted"
              >
                Email should have at least 4 characters
              </small>
              <small
                class="error-text uk-form-help-block"
                v-if="!$v.email.email && formSubmitted"
              >
                Invalid email format
              </small>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >Username</label
              >
              <div class="uk-form-controls uk-inline uk-width-1-1">
                <span class="uk-form-icon" uk-icon="icon: user"></span>
                <input
                  :class="{
                    'uk-form-danger':
                      (!$v.username.required || !$v.username.minLength) &&
                      formSubmitted,
                  }"
                  v-model.trim="$v.username.$model"
                  class="uk-input uk-width-1-1"
                  type="text"
                  placeholder="Enter your username"
                />
              </div>
              <small
                class="error-text uk-form-help-block "
                v-if="!$v.username.required && formSubmitted"
              >
                Username is required
              </small>
              <small
                class="error-text uk-form-help-block"
                v-if="!$v.username.minLength && formSubmitted"
              >
                Username should have at least 4 characters
              </small>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >Password</label
              >
              <div class="uk-form-controls uk-width-1-1 uk-inline">
                <span class="uk-form-icon" uk-icon="icon: lock"></span>
                <input
                  :class="{
                    'uk-form-danger':
                      (!$v.password.required || !$v.password.minLength) &&
                      formSubmitted,
                  }"
                  v-model.trim="$v.password.$model"
                  class="uk-input uk-width-1-1"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <small
                class="error-text uk-form-help-block "
                v-if="!$v.password.required && formSubmitted"
              >
                Password is required
              </small>
              <small
                class="error-text uk-form-help-block"
                v-if="!$v.password.minLength && formSubmitted"
              >
                Password should have at least 8 characters
              </small>
            </div>

            <div class="uk-margin">
              <label class="uk-form-label" for="form-stacked-text"
                >Confirm Password</label
              >
              <div class="uk-form-controls uk-width-1-1 uk-inline">
                <span class="uk-form-icon" uk-icon="icon: lock"></span>
                <input
                  :class="{
                    'uk-form-danger':
                      (!$v.confirmPassword.required ||
                        !$v.confirmPassword.minLength ||
                        !$v.confirmPassword.sameAsPassword) &&
                      formSubmitted,
                  }"
                  v-model.trim="$v.confirmPassword.$model"
                  class="uk-input uk-width-1-1"
                  type="password"
                  placeholder="Re-Enter your password"
                />
              </div>
              <small
                class="error-text uk-form-help-block "
                v-if="!$v.confirmPassword.required && formSubmitted"
              >
                Password is required
              </small>
              <small
                class="error-text uk-form-help-block"
                v-if="!$v.confirmPassword.minLength && formSubmitted"
              >
                Password should have at least 8 characters
              </small>
              <small
                class="error-text uk-form-help-block"
                v-if="!$v.confirmPassword.sameAsPassword && formSubmitted"
              >
                Passwords does not match
              </small>
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
import { required, minLength, sameAs } from "vuelidate/lib/validators";

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
      formSubmitted: false,
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
    username: {
      required,
      minLength: minLength(4),
    },
    email: {
      required,
      minLength: minLength(4),
    },
    password: {
      required,
      minLength: minLength(8),
    },
    confirmPassword: {
      required,
      minLength: minLength(8),
      sameAsPassword: sameAs("password"),
    },
  },
  methods: {
    signup() {
      this.formSubmitted = true;
      this.showError = false;
      this.errorMessage = "";

      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

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
.error-text {
  color: red;
  display: block;
}
</style>
