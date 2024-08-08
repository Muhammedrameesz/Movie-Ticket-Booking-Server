// controllers/reviewController.js
const ReviewsSchema = require("../model/reviewSchema");
const User = require("../model/userSchema");


const reviews = async (req, res) => {
  try {
    const { comment, rating, movieId } = req.body;
    if (!comment || !rating) {
      return res.status(400).json({ message: "Incomplete data" });
    }

    const movieID = movieId;
    const userEmail = req.user;
    if (!req.user) {
      return res.status(401).json({ message: "User not authorized" });
    }
    
    const userExist = await User.findOne({ email: userEmail });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
  
    const review = new ReviewsSchema({
      movieId: movieID,
      comment,
      rating,
      email :userEmail,
    });

    await review.save();
    res.status(200).json({ message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getReviews = async (req, res) => {
    try {
      const movieId = req.params.id;
      
      const reviews = await ReviewsSchema.find({ movieId: movieId });
      res.status(200).json({ reviews: reviews });
    } catch (error) {
      console.error('Error fetching reviews:', error); // Debug log
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

module.exports = {
    reviews,
    getReviews
};
