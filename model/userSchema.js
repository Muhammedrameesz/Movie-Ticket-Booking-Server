const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user"],
      default: "user",
    },
    movies: [{ type: mongoose.Types.ObjectId, ref: "Movies" }],
  },
  { timestamps: true }
);

const User = new mongoose.model("UsersList", userSchema);

module.exports = User;
