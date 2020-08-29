const app = require("../server");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const { User, Expense } = require("../schemas");

router.get("/:userOne/:userTwo", async (req, res, next) => {
  const userOne = req.params.userOne;
  const userTwo = req.params.userTwo;

  const expenses = await Expense.find().all("members", [userOne, userTwo]);

  if (expenses.length > 0) {
    const balance = await calculateBalance(userOne, userTwo, expenses);
    res.status(200).send({ userOne, userTwo, balance });
  } else {
    res.status(204).send();
  }
});

router.get("/:userId", async (req, res, next) => {
  const userId = req.params.userId;

  const expenses = await Expense.find().all("members", [userId]);

  if (expenses.length > 0) {
    const balance = await calculateTotalBalance(userId, expenses);
    res.status(200).send({ userId, balance });
  } else {
    res.status(204).send();
  }
});

function calculateBalance(userOne, userTwo, expenses) {
  let balance = 0;

  for (const expense of expenses) {
    // Amount of Expense
    const amount = +expense.amount;

    const isUserOnePayer = expense.payers.find(
      (payer) => payer.user == userOne
    );

    const isUserTwoPayer = expense.payers.find(
      (payer) => payer.user == userTwo
    );

    // Users Splits
    const userOneSplit = expense.split.find((split) => split.user == userOne);
    const userTwoSplit = expense.split.find((split) => split.user == userTwo);

    if (isUserOnePayer && !isUserTwoPayer) {
      // If User 1 Lended
      const userPayPercentage = isUserOnePayer.percentage;
      const userLendToOtherUser =
        (((amount * userTwoSplit.percentage) / 100) * userPayPercentage) / 100;
      balance += userLendToOtherUser;
    } else if (isUserTwoPayer && !isUserOnePayer) {
      // If User 2 Lended
      const userPayPercentage = isUserTwoPayer.percentage;
      const userOweToOtherUser =
        (((amount * userOneSplit.percentage) / 100) * userPayPercentage) / 100;
      balance -= userOweToOtherUser;
    } else if (isUserOnePayer && isUserTwoPayer) {
      // If both Lended
      const userOnePayPercentage = isUserOnePayer.percentage;
      const userTwoPayPercentage = isUserTwoPayer.percentage;
      const userLendToOtherUser =
        (((amount * userTwoSplit.percentage) / 100) * userOnePayPercentage) /
        100;
      const userOweToOtherUser =
        (((amount * userOneSplit.percentage) / 100) * userTwoPayPercentage) /
        100;

      balance += userLendToOtherUser;
      balance -= userOweToOtherUser;
    } else {
    }
  }

  return balance;
}

function calculateTotalBalance(userId, expenses) {
  let balance = 0;

  for (const expense of expenses) {
    // Amount of Expense
    const amount = +expense.amount;

    const isUserOnePayer = expense.payers.find((payer) => payer.user == userId);

    // Users Splits
    const userOneSplit = expense.split.find((split) => split.user == userId);

    if (isUserOnePayer) {
      const userPayPercentage = isUserOnePayer.percentage;
      const userPayment = (amount * userPayPercentage) / 100;
      const userLendToOtherUser =
        userPayment - (amount * userOneSplit.percentage) / 100;
      balance += userLendToOtherUser;
    } else {
      balance -= (amount * userOneSplit.percentage) / 100;
    }
  }

  return balance;
}

module.exports = router;
