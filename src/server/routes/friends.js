const express = require("express");
const router = express.Router();
const { User } = require("../schemas");

// Add A Friend
router.post("/:userId/:friendId", async (req, res) => {
  const userId = req.params.userId;
  const friendId = req.params.friendId;
  console.log("Getting User ", userId);
  console.log("Adding Friend ", friendId);
  const user = await User.findOne({ _id: userId });
  const friend = await User.findOne({ _id: friendId });
  const friends = user.friends;
  if (!friend) {
    res.status(400).json({
      error: "Invalid Friend",
      message: `No user exists with id ${friendId}`,
    });
  } else {
    if (friends.includes(friendId)) {
      res.json({
        error: "Friend Already Added",
        message: "Friend Already Added",
      });
    } else {
      const friendToAdd = {
        userId: friend._id,
        name: friend.name,
        username: friend.username,
        email: friend.email,
      };
      console.log("Friend To Add", friendToAdd);
      friends.push(friendToAdd);
      user.friends = friends;
      user.save();
      res.status(201).json(user);
    }
  }
});

// Get All Friends
router.get("/:userId", async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log("Getting User ", userId);
    console.log("Getting Friends ");
    const user = await User.findOne({ _id: userId });
    const friends = user.friends;
    res.json(friends);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
