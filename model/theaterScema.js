const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
   contact:{
    type: Number,
    required: true,
   },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner',
    required: true
},
});

const Theater = new mongoose.model("Theaters",theaterSchema)

module.exports = Theater;
