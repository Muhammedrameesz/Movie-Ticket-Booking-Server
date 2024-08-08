const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        email: {
            type: String,
            required: true
           
        },
        movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movies'
        }
    }
);

const Reviews = mongoose.model('Reviews', reviewSchema);

module.exports = Reviews;