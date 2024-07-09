const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists already
    let user = await User.findOne({ email });

    if (user) {
      // return res
      //   .status(400)
      //   .json({ message: "User already exists with that email." });
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
      token: jsonwebtoken.sign({ id: this._id }, process.env.JWT_KEY, {
        expiresIn: "30d",
      }),
    });
  } catch (error) {
    next(error);
    // return res.status(500).json({ message: "Something went wrong. " + error });
  }
};

module.exports = {
  registerUser,
};
