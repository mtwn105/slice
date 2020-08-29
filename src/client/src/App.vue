<template>
  <div id="app" class="uk-background-primary">
    <nav class="uk-navbar-container uk-margin uk-navbar-transparent" uk-navbar>
      <div class="uk-navbar-left">
        <a class="uk-navbar-item uk-logo uk-light" href="#">Slice</a>
      </div>
      <div class="uk-navbar-right">
        <div class="uk-navbar-item">
          <form action="javascript:void(0)">
            <button
              @click="this.$router.push({ path: '/signup' })"
              class="uk-button uk-button-default uk-light"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  overflow-y: auto;
}
.home {
}

.login-section {
  align-content: center;
}
</style>
