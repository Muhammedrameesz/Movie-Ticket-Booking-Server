const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
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
      enum: ["admin", "owner"],
      default: "admin",
      
    },
    status: {
      type: String,
      enum: ["active"],
      default: "active",
    },

    movies: [{ type: mongoose.Types.ObjectId, ref: "Movies" }],
  },
  { timestamps: true }
);

const Admin = new mongoose.model("AdminList", adminSchema);

module.exports = Admin;
