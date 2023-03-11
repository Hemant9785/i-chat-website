const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
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
const hashfun = asyncHandler(async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hs = await bcrypt.hash(pass, salt);
  return hs;
});
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const hs = await hashfun(password);
  User.findOne({ email })
    .then((user) => {
      // const is = hs === user.password;
      bcrypt.compare(password, user.password).then((is) => {
        console.log(is);

        console.log(hs);
        console.log(is);
        console.log(password);
        console.log(user);
        if (is) {
          res.status(200).json({
            _id: user._id,
            email: user.email,
            pic: user.password,
            token: generateToken(user._id),
            name: user.name,
            isAdmin: user.isAdmin,
          });
        } else {
          res.status(400).json({
            error: "Invalid credentials",
            errors: "Invalid",
          });
          throw new Error("Invalid Credentials");
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = { registerUser, authUser };
