<template>
  <div class="dashboard">
    <h1 class="uk-heading-divider dashboard-heading">Manage Friends</h1>
    <div class="uk-child-width-expand@s uk-grid-small uk-grid-match" uk-grid>
      <div>
        <div class="uk-card uk-card-small uk-card-default uk-card-body uk-animation-scale-up">
          <h2 class="uk-card-title">Search User</h2>
          <div v-for="user in users" :key="user._id">
            <div class="uk-card uk-card-primary uk-card-body uk-margin user-card">
              <div class uk-grid>
                <h3 class="uk-card-title uk-width-expand@s">{{user.name}}</h3>
                <button
                  v-if="!friends.find((friend) => friend.userId == user._id)"
                  class="uk-button uk-button-primary uk-responsive-width"
                  @click="addFriend(user)"
                >Add</button>
                <button
                  v-if="friends.find((friend) => friend.userId == user._id)"
                  class="uk-button uk-button-secondary uk-responsive-width added-friend-button"
                  @click="removeFriend(user)"
                >Remove</button>
              </div>
              <p>Username: {{user.username}}</p>
              <p>Email: {{user.email}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllUsers, addFriend, getUserInfo, removeFriend } from "../API";
import router from "@/router";

import UIkit from "uikit";
export default {
  name: "AddFriend",
  mounted() {
    const userId = localStorage.getItem("userId");

    getAllUsers().then(res => {
      if (res.status == 200) {
        res.json().then(json => {
          this.users = json;
          const userIndex = this.users.findIndex(user => user._id == userId);
          this.users = this.users.slice(0, userIndex);
        });
      } else {
        this.users = [];
      }
    });

    getUserInfo().then(res => {
      if (res.status == 200) {
        res.json().then(json => {
          const userInfo = json;
          this.friends = userInfo.friends;
        });
      } else {
        this.friends = [];
      }
    });
  },
  data() {
    return {
      users: [],
      friends: []
    };
  },
  methods: {
    addFriend(friend) {
      console.log("Friend ID ", friend._id);
      UIkit.modal
        .confirm(`Are you sure to add ${friend.name} as a friend?`)
        .then(
          function() {
            addFriend(friend._id).then(res => {
              if (res.ok) {
                UIkit.notification(`Added Friend Successfully`, {
                  status: "success"
                });
                router.push("/dashboard");
              }
            });
          },
          function() {}
        );
    },
    removeFriend(friend) {
      console.log("Friend ID ", friend._id);
      UIkit.modal
        .confirm(`Are you sure to remove ${friend.name} as a friend?`)
        .then(
          function() {
            removeFriend(friend._id).then(res => {
              if (res.ok) {
                UIkit.notification(`Removed Friend Successfully`, {
                  status: "danger"
                });
                router.push("/dashboard");
              }
            });
          },
          function() {}
        );
    }
  }
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
.user-card {
  width: 100%;
}

.user-header {
  display: flex;
}

.added-friend-button {
  background-color: #222;
  color: #fff;
}

button {
  padding: 0 40px;
}

p {
  margin: 0;
}
</style>
