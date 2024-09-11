const User = require("../models/userModel");

const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    // check if user exists already
    let user = await User.findOne({ email });

    if (user) {
      throw new Error(`User ${user.email} already exists.`);
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
      token: await User.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    res.status(200).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await User.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
