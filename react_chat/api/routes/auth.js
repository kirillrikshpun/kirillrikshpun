const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const authMiddleware = require("../middleWare/authMiddleware");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).lean();
    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("wrong password");

    //creating token
    const token = jwt.sign(
      { user_id: user._id, email: user.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/getUser", authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).lean();

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
