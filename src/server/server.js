const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./db");
const authenticateJWT = require("./jwt");
const authRouter = require("./routes/auth");
const { router: userRouter } = require("./routes/user");
const expenseRouter = require("./routes/expense");
const { router: balanceRouter } = require("./routes/balance");
const friendRouter = require("./routes/friends");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());

connectDB();

// Routers

app.use("/auth", authRouter);
app.use("/users", authenticateJWT, userRouter);
app.use("/friends", authenticateJWT, friendRouter);
app.use("/expense", authenticateJWT, expenseRouter);
app.use("/balance", authenticateJWT, balanceRouter);

// Error Handler
function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found - " + req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    error: err.name,
    message: err.message,
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 3000, function () {
  console.log("Slice is running");
});

module.exports = app;
