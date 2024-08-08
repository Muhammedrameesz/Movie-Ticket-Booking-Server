const Bookings = require("../model/paymentSchema");
const User = require("../model/userSchema");
const Movies = require("../model/movieSchema");
const Admin = require("../model/adminSchema");
const Theater = require("../model/theaterScema");


const userBookings = async (req, res) => {
  try {
    const userMail = req.user;
    const userExist = await User.findOne({ email: userMail });

    if (!userExist) {
      return res.status(400).json({ message: "User not found" });
    }

    const userId = userExist._id;

    if (!userId) {
      return res.status(400).json({ message: "User id not found" });
    }

  
    const bookings = await Bookings.find({ userId: userId });

    
    const bookingsWithMovieDetails = await Promise.all(
      bookings.map(async (booking) => {
        const movieDetails = await Movies.findOne({ title: booking.movieName });
        return {
          ...booking._doc,
          movieDetails: movieDetails || {},
        };
      })
    );

    res.status(200).json(bookingsWithMovieDetails);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const ownerBookings = async (req, res) => {
    try {
      const ownerEmail = req.admin;
      if (!ownerEmail) {
        return res.status(401).json({ message: "Admin not authenticated" });
      }
  
      const ownerExist = await Admin.findOne({ email: ownerEmail });
      if (!ownerExist) {
        return res.status(400).json({ message: "Admin not found" });
      }
  
      const ownerId = ownerExist._id;
      const theaterDetails = await Theater.find({ owner: ownerId });
  
      
      const theaterNames = Array.isArray(theaterDetails)
        ? theaterDetails.map(theater => theater.name)
        : [theaterDetails.name];
  
      
      const bookings = await Bookings.find({ theaterName: { $in: theaterNames } });
         
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
  

const allBookings = async (req, res) => {
  try {
   
    const bookings = await Bookings.find({});

    const bookingsWithMovieDetails = await Promise.all(
      bookings.map(async (booking) => {
        const movieDetails = await Movies.findOne({ title: booking.movieName });
        const movieImage = movieDetails ? movieDetails.image : null;
        const UserDetails = await User.findById(booking.userId);
        const userEmail = UserDetails.email;
        return {
          ...booking.toObject(), 
          movieImage: movieImage, 
          userEmail: userEmail, 
        };
      })
    );
    res.status(200).json({ bookings: bookingsWithMovieDetails });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  userBookings,
  ownerBookings,
  allBookings,
};
