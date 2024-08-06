const User = require("../models/userModel");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      token: jsonwebtoken.sign({ id: this._id }, process.env.JWT_KEY, {
        expiresIn: "30d",
      }),
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
      throw new Error("Invalid user credentials.");
    }

    const comparePasswords = async function (enteredPassword) {
      if (await bcrypt.compare(enteredPassword, this.password)) {
        return true;
      } else {
        return false;
      }
    };

    if (comparePasswords(password)) {
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
    } else {
      throw new Error("Invalid login credentials.");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
