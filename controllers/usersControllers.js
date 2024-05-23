const User = require("../models/userModel");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists already
    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists with that email." });
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
      token: null,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = { registerUser };
