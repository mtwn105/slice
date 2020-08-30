const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User Schema

const userSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  signedUpDate: { type: Date, default: Date.now },
  lastLoginDate: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema, "users");

// Group Schema

const groupSchema = new Schema({
  name: { type: String, required: true },
  members: { type: [userSchema] },
  createdDate: { type: Date, default: Date.now },
});

const Group = mongoose.model("Group", groupSchema, "groups");

// Split Schema

const splitSchema = new Schema({
  user: { type: String, required: true },
  percentage: { type: Number, required: true },
});

const Split = mongoose.model("Split", splitSchema);

// Expense Schema

const expenseSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true, min: 1 },
  groupId: { type: String },
  category: { type: String },
  members: { type: [String], required: true },
  payers: { type: [splitSchema], required: true },
  split: { type: [splitSchema], required: true },
  expenseDate: { type: Date, default: Date.now },
});

const Expense = mongoose.model("Expense", expenseSchema, "expenses");

module.exports = {
  User,
  Group,
  Split,
  Expense,
};
