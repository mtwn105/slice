const appUrl = "http://localhost:8000";
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export async function signUp(user) {
  console.log("Signing Up");
  const signupUrl = `${appUrl}/auth/signup`;

  return await fetch(signupUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(user),
  });
}

export async function logIn(user) {
  console.log("Logging In");
  const loginUrl = `${appUrl}/auth/login`;

  return await fetch(loginUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(user),
  });
}

export async function getTotalBalance() {
  const fetchBalanceUrl = `${appUrl}/balance/${userId}`;
  const response = await fetch(fetchBalanceUrl, {
    method: "GET",
    headers: headers,
  });
  return response;
}

export async function getExpenses() {
  const fetchExpensesUrl = `${appUrl}/expense/${userId}`;
  const response = await fetch(fetchExpensesUrl, {
    method: "GET",
    headers: headers,
  });
  return response;
}

export async function getFriends() {
  const fetchFriendsUrl = `${appUrl}/friends/${userId}`;
  const response = await fetch(fetchFriendsUrl, {
    method: "GET",
    headers: headers,
  });
  return response;
}

export async function addFriend(friendId) {
  const fetchFriendsUrl = `${appUrl}/friends/${userId}/${friendId}`;
  const response = await fetch(fetchFriendsUrl, {
    method: "POST",
    headers: headers,
  });
  return response;
}

export async function removeFriend(friendId) {
  const fetchFriendsUrl = `${appUrl}/friends/${userId}/${friendId}`;
  const response = await fetch(fetchFriendsUrl, {
    method: "DELETE",
    headers: headers,
  });
  return response;
}

export async function getAllUsers() {
  const fetchUsersUrl = `${appUrl}/users`;
  const response = await fetch(fetchUsersUrl, {
    method: "GET",
    headers: headers,
  });
  return response;
}

export async function getUserInfo() {
  const fetchUserInfoUrl = `${appUrl}/users/${userId}`;
  const response = await fetch(fetchUserInfoUrl, {
    method: "GET",
    headers: headers,
  });
  return response;
}
