const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { email, name, password, pic } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  } else {
    const user = await User.create({
      name,
      email,
      pic,
      password,
    });

    if (user) {
      res.status(200).json({
        _id: user._id,
        email: user.email,
        pic: user.password,
        token: generateToken(user._id),
        name: user.name,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Failed to create User");
    }
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      pic: user.password,
      token: generateToken(user._id),
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

module.exports = { registerUser, authUser };
