const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  userName: { type: String , required: true},
  role: [ 'admin', 'user' ],
  provider: { type: String, default: "local" },
  googleId: { type: String },
  githubId: { type: String },
});

module.exports = mongoose.model("userModel", userSchema, "users");
