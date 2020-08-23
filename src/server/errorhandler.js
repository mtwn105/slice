const { model } = require("mongoose");

function errorHandler(err, req, res, next) {
  if (err.name == "ValidationError") {
    res.status(400).send({ error: err.name, message: err.message });
  }
  res.status(500).send({ error: err.name, message: err.message });
}

module.exports = errorHandler;
