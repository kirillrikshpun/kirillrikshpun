const router = require("express").Router();
const Conversation = require("../models/Conversation");

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete conv of a user

router.delete("/:userConvId", async (req, res) => {
  try {
    const conversation = await Conversation.findOneAndDelete({
      members: { $in: [req.params.userConvId] },
    });
    res.status(200).json("conv deleted" + conversation._id);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
