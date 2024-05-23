const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    avatar: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, required: false },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // "this" being the new user document being created from the controllers
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  }
  return next();
});

const UserJWT = (userSchema.methods.generateJWT = async function () {
  // "this" again references the new user document being created/ sent from the controller
  return jsonwebtoken.sign({ id: this._id }, process.env.JWT, {
    expiresIn: "30d",
  });
});

(module.exports = mongoose.model("User", userSchema)), UserJWT;
