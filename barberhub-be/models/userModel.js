const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String , required: true},
  userName: { type: String , required: true, unique: true},
  role: [ 'admin', 'user' ],
  provider: { type: String, default: "local" },
  googleId: { type: String },
  githubId: { type: String },
});

module.exports = mongoose.model("userModel", userSchema, "users");
