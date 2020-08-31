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
          >
            {{ Math.abs(totalBalance) | currency("₹") }}
          </h2>
          <p v-if="totalBalance == 0">You are settled up.</p>
          <p v-if="totalBalance > 0">
            You lend {{ Math.abs(totalBalance) | currency("₹") }}.
          </p>
          <p v-if="totalBalance < 0">
            You owe {{ Math.abs(totalBalance) | currency("₹") }}.
          </p>
        </div>
      </div>
      <div>
        <div
          class="uk-card uk-card-secondary uk-card-body uk-animation-scale-up"
        >
          <h3 class="uk-card-title">{{ expenses.length }}</h3>
          <p>Total Expenses</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  mounted() {
    const fetchTotalBalanceUrl =
      "https://slice-nodejs.herokuapp.com/balance/" +
      localStorage.getItem("userId");
    const fetchExpensesUrl =
      "https://slice-nodejs.herokuapp.com/expense/" +
      localStorage.getItem("userId");

    fetch(fetchTotalBalanceUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        const balance = res.json();
        this.totalBalance = balance.balance;
      } else {
        this.totalBalance = 0;
      }
    });
    fetch(fetchExpensesUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status == 200) {
        const expenses = res.json();
        if (expenses.length > 0) {
          this.expenses = expenses;
        }
      }
    });
  },
  data() {
    return {
      totalBalance: 0,
      expenses: [],
    };
  },
  methods: {},
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
