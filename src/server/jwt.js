const jwt = require("jsonwebtoken");

// Verify JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log("Invalid Token");
        return res.status(403).json({
          error: "You are unauthorised to perform this action",
        });
      }
      req.user = user;
      next();
    });
  } else {
    console.log("Unauthorized Access");
    res.status(401).json({
      error: "You are unauthorised to perform this action",
    });
  }
};

module.exports = authenticateJWT;
