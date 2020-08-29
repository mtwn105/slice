const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require("../schemas");
const { checkIfUserAlreadyExists } = require("./user");


// Signup User
router.post("/signup", async (req, res, next) => {

    const userObj = req.body;

    console.log("Creating User");
    console.log("User : ", userObj);

    const userAlreadyExists = await checkIfUserAlreadyExists(userObj.username, userObj.email);

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
            try {
                const user = new User(userObj);
                user.save();
                res.status(201).json(user);
            } catch (err) {
                next(err);
            }
        })
    }

});

// Login User
router.post("/login", async (req, res, next) => {

    const userObj = req.body;

    console.log("Creating User");
    console.log("User : ", userObj);

    const userByUsername = await User.findOne({ username: userObj.username });

    if (userByUsername != null) {

        // Check If password is correct
        bcrypt.compare(userObj.password, userByUsername.password).then((result) => {
            if (result) {

                // Generate Token 
                const token = jwt.sign({
                    data: userObj
                }, process.env.TOKEN_SECRET, { expiresIn: '1d' });

                res.status(200).send({
                    username: userObj.username,
                    token
                });
            } else {
                res.status(401).json({
                    error: "Invalid Credentials",
                    message: `Invalid username or password`,
                });
            }
        })

    } else {
        res.status(401).json({
            error: "User Not Found",
            message: `User with username ${userObj.username} or email ${userObj.email} not found`,
        });
    }
});

module.exports = router;

