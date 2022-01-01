const User = require("../models/User");
const Conversation = require("../models/Conversation");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleWare/authMiddleware");

//get a user
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all users
router.get("/all", async (req, res) => {
  let allUsers = [];
  try {
    allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        if (currentUser.followers.includes(req.params.id)) {
          console.log(req.body.senderId);
          const extConv = await Conversation.findOne({
            members: { $all: [req.params.id, req.body.userId] },
          });
          console.log(extConv);
          if (!extConv) {
            const newConversation = new Conversation({
              members: [req.params.id, req.body.userId],
            });
            const savedConversation = await newConversation.save();
            res.status(200).json(savedConversation);
          }
        } else res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant follow yourself");
  }
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        await Conversation.findOneAndDelete({
          $and: [{ members: req.params.id }, { members: req.body.userId }],
        });
        res.status(200).json("Conversation has been deleted");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

module.exports = router;
