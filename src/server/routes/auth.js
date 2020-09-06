const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { User } = require("../schemas");
const { checkIfUserAlreadyExists } = require("./user");

/**
 * @apiDefine UserAlreadyExistsError
 *
 * @apiError UserAlreadyExist User already Exists
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "User Already Exists",
 *       "message": "User with username abc or email abc already exists"
 *     }
 *
 */

/**
 * @apiDefine InvalidCredentialsError
 *
 * @apiError InvalidCredentials Invalid Credentials
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "error": "Invalid Credentials",
 *       "message": "Invalid username or password"
 *     }
 *
 */

/**
 * @apiDefine UserNotFoundError
 *
 * @apiError UserNotFound User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "User not found."
 *     }
 */

// Signup User

/**
 * @api {post} /auth/signup Signup User
 * @apiName Signup User
 * @apiGroup Auth
 *
 * @apiParam {String} username Username of the user
 * @apiParam {String} name Name of the user
 * @apiParam {String} password Password of the user
 * @apiParam {String} email Email of the user
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *        "_id": "1234",
 *        "username": "mtwn105",
 *        "name": "Amit",
 *        "email": "mtwn105@gmail.com",
 *        "password": "1234",
 *     }
 *
 * @apiUse UserAlreadyExistsError
 *
 */
router.post("/signup", async (req, res, next) => {
  const userObj = req.body;

  console.log("Creating User");
  console.debug("User : ", userObj);

  const userAlreadyExists = await checkIfUserAlreadyExists(
    userObj.username,
    userObj.email
  );

  if (userAlreadyExists) {
    res.status(400).send({
      error: "User Already Exists",
      message: `User with username ${userObj.username} or email ${userObj.email} already exists`,
    });
  } else {
    bcrypt.hash(userObj.password, 12, (err, hash) => {
      if (err) {
        next(err);
      }
      userObj.password = hash;

      const user = new User(userObj);
      user
        .save()
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((err) => next(err));
    });
  }
});

// Login User

/**
 * @api {post} /auth/login Login User
 * @apiName Login User
 * @apiGroup Auth
 *
 * @apiParam {String} username Username of the user
 * @apiParam {String} password Password of the user
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "_id": "1234",
 *        "username": "mtwn105",
 *        "name": "Amit",
 *        "email": "mtwn105@gmail.com",
 *        "token": "adasdasdxczxcawdeqwscascasd",
 *     }
 *
 *  @apiUse InvalidCredentialsError
 *  @apiUse UserNotFoundError
 */
router.post("/login", async (req, res, next) => {
  const userObj = req.body;

  console.log("Logining In User");
  console.debug("User : ", userObj);

  const userByUsername = await User.findOne({ username: userObj.username });

  if (userByUsername != null) {
    // Check If password is correct
    bcrypt.compare(userObj.password, userByUsername.password).then((result) => {
      if (result) {
        // Generate Token
        const token = jwt.sign(
          {
            data: userObj,
          },
          process.env.TOKEN_SECRET,
          { expiresIn: "1d" }
        );

        userByUsername.lastLoginDate = new Date();
        userByUsername.save();

        res.status(200).send({
          userId: userByUsername._id,
          username: userByUsername.username,
          name: userByUsername.name,
          email: userByUsername.email,
          token,
        });
      } else {
        res.status(401).json({
          error: "Invalid Credentials",
          message: `Invalid username or password`,
        });
      }
    });
  } else {
    res.status(404).json({
      error: "User Not Found",
      message: `User with username ${userObj.username} not found`,
    });
  }
});

module.exports = router;
