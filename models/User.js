const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ["local", "google"],
    required: true
  },
  local: {
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      unique: true,
      lowercase: true
    }
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  isDoctor: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("user", UserSchema);
