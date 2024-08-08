const PayLater = require("../model/paymentSchema");
const User = require("../model/userSchema");
const Movie = require("../model/movieSchema");
const sendEmail = require("./nodeMailerController");

const payLater = async (req, res, next) => {
  try {
    const data = req.body;
    const {
      movieName,
      theaterName,
      seatNumbers,
      date,
      time,
      location,
      totalReservation,
      price,
      mode,
    } = data;

    if (
      !movieName ||
      !theaterName ||
      !seatNumbers ||
      !date ||
      !time ||
      !location
    ) {
      return res.status(400).json({ message: "Incomplete data" });
    }

    const paymentStatus = () => {
      if (mode === "paid") return "paid";
      else return "payLater";
    };

    const movieExist = await Movie.findOne({ title: movieName });
    if (!movieExist) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const movieImage = movieExist ? movieExist.image : null;

    const userEmail = req.user;
    const userExist = await User.findOne({ email: userEmail });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const payment = new PayLater({
      userId: userExist._id,
      movieName,
      theaterName,
      seetNumbers: seatNumbers, 
      date,
      time,
      location,
      totalReservation,
      amount: price,
      paymentStatus: paymentStatus(),
    });

    await payment.save();

    await sendEmail(userEmail,payment, movieImage,seatNumbers);

    res.status(200).json({ message: "Payment successful. A confirmation email has been sent. Please check your inbox." });
    return next();
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = payLater;
