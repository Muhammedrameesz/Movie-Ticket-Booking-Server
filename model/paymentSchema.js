const mongoose = require("mongoose");

const payLaterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  totalReservation: {
    type: Number,
    required: true,
  },
  movieName: {
    type: String,
    required: true,
  },
  theaterName: {
    type: String,
    required: true,
  },
  seetNumbers: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const PayLater = mongoose.model("BookingCollection", payLaterSchema);

module.exports = PayLater;
