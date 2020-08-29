const app = require("../server");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User, Expense } = require("../schemas");

router.get("/:userId", async (req, res) => {
  console.log("Finding Expenses for User Id ", req.params.userId);
  const expenses = await Expense.find({ members: req.params.userId });
  res.json(expenses);
});

router.post("/", async (req, res, next) => {
  try {
    const expense = new Expense(req.body);
    expense.save();
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
});

router.get("/:userOne/:userTwo", async (req, res, next) => {
  const userOne = req.params.userOne;
  const userTwo = req.params.userTwo;

  const expenses = await Expense.find().all("members", [userOne, userTwo]);
  res.json(expenses);
});

module.exports = router;
