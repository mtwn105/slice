const express = require("express");
const router = express.Router();
const { Expense } = require("../schemas");
const { calculateBalanceForExpense } = require("./balance");

router.get("/:userId", async (req, res, next) => {
  console.log("Finding Expenses for User Id ", req.params.userId);
  try {
    const expenses = await Expense.find().all("members.id", [
      req.params.userId,
    ]);
    const expensesWithBalance = [];
    for (const expense of expenses) {
      console.log("EXP", expense);
      expensesWithBalance.push({
        expense,
        balance: calculateBalanceForExpense(req.params.userId, expense),
      });
    }
    res.json(expensesWithBalance);
  } catch (err) {
    next(err);
  }
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

  const expenses = await Expense.find().all("members.id", [userOne, userTwo]);
  res.json(expenses);
});

module.exports = router;
