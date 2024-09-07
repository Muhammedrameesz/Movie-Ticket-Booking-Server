const mongoose = require("mongoose");

const cancelRequestsSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId,required: true,},
  userId: { type: mongoose.Schema.Types.ObjectId, required: true,},
  ownerId: { type: mongoose.Schema.Types.ObjectId, required: true,},
  amount: {type: Number,required: true,},
  totalResurvation: {type: String,required: true,},
  movieName: { type: String, required: true },
  theaterName: { type: String, required: true },
  seetNumbers: [{ type: String, required: true }],
  date: { type: Date, required: true },
  time: { type: String, required: true },
  paymentDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const cancelRequests = new mongoose.model('cancelBookingRequest',cancelRequestsSchema)
module.exports=cancelRequests
