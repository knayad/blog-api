const User = require("../models/userModel");
const generateJWT = require("../models/userModel");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists already
    let user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exists with that email.");
    }
    // create a new user if email is not found.
    user = await User.create({ name, email, password });

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: generateJWT,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email or password did not match our system.");
    }
  } catch {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
