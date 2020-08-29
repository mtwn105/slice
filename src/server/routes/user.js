const express = require("express");
const router = express.Router();
const { User } = require("../schemas");

// Get All Users
router.get("/", async (req, res) => {
  console.log("Getting All Users");
  const users = await User.find();
  res.json(users);
});

// Get By User Id
router.get("/:userId", async (req, res) => {
  console.log("Getting User ", req.params.userId);
  const user = await User.findOne({ _id: req.params.userId });
  res.json(user);
});

// Search User

async function checkIfUserAlreadyExists(username, email) {
  const userByUsername = await User.findOne({ username });
  const userByEmail = await User.findOne({ email });
  if (userByUsername != null || userByEmail != null) {
    return true;
  } else {
    return false;
  }
}

module.exports = { router, checkIfUserAlreadyExists };
