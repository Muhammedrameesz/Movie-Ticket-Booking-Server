const mongoose = require('mongoose');

const DB = process.env.DB_URL

const DBconnection=async()=>{
    try {
       await mongoose.connect(DB)
        console.log("Connected to MongoDB...")
    } catch (error) {
        console.error("Failed to connect to MongoDB", error)
        
    }
}

module.exports = DBconnection;