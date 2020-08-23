const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./db");
const userRouter = require("./routes/user");
const expenseRouter = require("./routes/expense");
const balanceRouter = require("./routes/balance");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

connectDB();

// Routers

app.use("/users", userRouter);
app.use("/expense", expenseRouter);
app.use("/balance", balanceRouter);

// Error Handler
app.use(function (err, req, res, next) {
  console.error(err.name);
  res.status(500).send("Something broke!");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Slice is running");
});

module.exports = app;
