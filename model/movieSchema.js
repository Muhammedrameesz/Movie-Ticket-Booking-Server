const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    iframeUrl: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    date:{
      type: Date,
      required: true,

    },
    admin: [{ type: mongoose.Types.ObjectId, ref: "Admin" }],
  },
  { timestamps: true }
);


const Movies = new mongoose.model("Movies", movieSchema);

module.exports = Movies;











// tickets: {
//     type: [
//         {
//             seatNumber: { type: Number, required: true },
//             price: { type: Number, required: true },
//             status: { type: String, enum: ['available', 'sold'], default: 'available' },
//         },
//     ],
// },
// showtimes: {
//     type: [Date],
//     required: true,
// },
