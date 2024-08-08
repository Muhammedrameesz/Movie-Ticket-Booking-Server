const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  picture: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

const GoogleUser = mongoose.model("GoogleUser", googleUserSchema);

module.exports = GoogleUser;