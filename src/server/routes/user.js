const app = require("../server");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User } = require("../schemas");
const errorHandler = require("../errorhandler");

// Get All Users
router.get("/", async (req, res) => {
  console.log("Getting All Users");
  const users = await User.find();
  return res.json(users);
});

// Get By User Id
router.get("/:userId", async (req, res) => {
  console.log("Getting User ", req.params.userId);
  const user = await User.findOne({ _id: req.params.userId });
  return res.json(user);
});

// Create User
router.post("/", async (req, res) => {
  console.log("Creating User");
  const newUser = req.body;
  console.log("User : ", req.body);

  const userAlreadyExists = await checkIfUserAlreadyExists(req.body.username);

  if (userAlreadyExists) {
    return res.status(400).send({
      error: "User Already Exists",
      message: `User with username ${req.body.username} already exists`,
    });
  }

  try {
    const user = new User(req.body);
    user.save();
    return res.status(201).json(user);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

// Search User

async function checkIfUserAlreadyExists(username) {
  const user = await User.findOne({ username: username });
  if (user != null) {
    return true;
  } else {
    false;
  }
}

module.exports = router;
