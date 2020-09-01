<template>
  <div class="dashboard">
    <h1 class="uk-heading-divider dashboard-heading">Dashboard</h1>
    <div class="uk-child-width-expand@s uk-grid-small uk-grid-match" uk-grid>
      <div>
        <div class="uk-card uk-card-default uk-card-body uk-animation-scale-up">
          <h2
            :class="{
              'uk-text-success': totalBalance > 0,
              'uk-text-danger': totalBalance < 0,
            }"
            class="uk-card-title"
          >{{ Math.abs(totalBalance) | currency("₹") }}</h2>
          <p v-if="totalBalance == 0">You are settled up.</p>
          <p v-if="totalBalance > 0">You lend {{ Math.abs(totalBalance) | currency("₹") }}.</p>
          <p v-if="totalBalance < 0">You owe {{ Math.abs(totalBalance) | currency("₹") }}.</p>
        </div>
      </div>
      <div>
        <div class="uk-card uk-card-secondary uk-card-body uk-animation-scale-up">
          <h3 class="uk-card-title">{{ expenses.length }}</h3>
          <p>Total Expenses</p>
        </div>
      </div>
      <div>
        <div class="uk-card uk-card-default uk-card-body uk-animation-scale-up">
          <h2 class="uk-card-title">{{ friends.length }}</h2>
          <p>Total Friends</p>
        </div>
      </div>
    </div>
    <div class="uk-child-width-expand@s uk-grid-small uk-grid-match" uk-grid>
      <div>
        <div class="uk-card uk-card-default uk-card-body uk-animation-scale-up">
          <h2 class="uk-card-title">Expenses</h2>
          <div v-for="expense in expenses" :key="expense._id">
            <div class="uk-card uk-card-primary uk-card-body">
              <h3 class="uk-card-title">Primary</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </div>
          <button
            class="uk-button uk-button-primary uk-button-large uk-margin uk-responsive-width"
          >Add an Expense</button>
        </div>
      </div>
      <div>
        <div class="uk-card uk-card-default uk-card-body uk-animation-scale-up">
          <h2 class="uk-card-title">Friends</h2>
          <button
            class="uk-button uk-button-primary uk-button-large uk-margin uk-responsive-width"
            @click="$router.push('/add-a-friend')"
          >Add a Friend</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getExpenses, getTotalBalance, getFriends } from "../API";

export default {
  name: "Dashboard",
  mounted() {
    getTotalBalance().then(res => {
      if (res.status == 200) {
        const balance = res.json();
        this.totalBalance = balance.balance;
      } else {
        this.totalBalance = 0;
      }
    });

    getExpenses().then(res => {
      if (res.status == 200) {
        const expenses = res.json();
        if (expenses.length > 0) {
          this.expenses = expenses;
        }
      }
    });
    getFriends().then(async res => {
      if (res.status == 200) {
        const friends = res.json;
        if (friends.length > 0) {
          this.friends = friends;
        }
      }
    });
  },
  data() {
    return {
      totalBalance: 0,
      expenses: [],
      friends: [],
      searchedUsers: []
    };
  },
  methods: {}
};
</script>

<style lang="scss">
.dashboard {
  padding-bottom: 40px;
  padding-left: 20px;
  padding-right: 20px;
  min-height: 100vh;
  max-width: 80vw;
  margin: auto;
}

.dashboard-heading {
  color: white;
  padding: 16px 8px;
}

.uk-card {
  width: 25rem;
  max-width: 90vw;
}

.uk-card-title {
  font-size: 2rem;
}

.signup-section {
  align-content: center;
}
.error-text {
  color: red;
  display: block;
}
</style>
