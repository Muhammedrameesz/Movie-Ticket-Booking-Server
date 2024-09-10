const mongoose = require('mongoose');

const canceledSeatsSchema = new mongoose.Schema({
  theaterName: {
    type: String,
    required: true
  },
  movieName: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    required: true 
  },
  seatNumbers:{
    type: [String],
    required:true
  },
    bookingTime:{
      type:String,
      required:true
    }
    
});

const CanceledSeat = mongoose.model('CanceledSeat', canceledSeatsSchema); 

module.exports = CanceledSeat;
