const mongoose = require("mongoose");


const showsSchema = new mongoose.Schema(
    {
        movieId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movies'
        },
        theaterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Theaters'
        },
        dateTime: {
            type: Date,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }
)

const Shows = mongoose.model('Shows', showsSchema);

module.exports = Shows;