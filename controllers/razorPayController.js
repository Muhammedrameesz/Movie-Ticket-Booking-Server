const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../model/razorpay");
const BookingDetails = require("../model/paymentSchema");
const User = require("../model/userSchema");
const sendEmail = require("./nodeMailerController");
const Movie = require("../model/movieSchema")


const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

const order = async (req, res) => {
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({ message: "Amount is required" });
  }

  try {
    const options = {
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Something Went Wrong!" });
      }
      res.status(200).json({ data: order });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

const verify = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    movieName,
    theaterName,
    seatNumbers,
    date,
    time,
    location,
    totalReservation,
    price,
    mode,
  } = req.body;

  try {
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET || "s")
      .update(sign.toString())
      .digest("hex");

    const isAuthentic = expectedSign === razorpay_signature;
    if (isAuthentic) {
      const payments = new Payment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      await payments.save();
      const paymentStatus = () => {
        if (mode === "paid") return "paid";
        else return "payLater";
      };

      const userEmail = req.user;
      const userExist = await User.findOne({ email: userEmail });
      if (!userExist) {
        return res.status(404).json({ message: "User not found" });
      }

      const movieExist = await Movie.findOne({ title: movieName });
      if (!movieExist) {
        return res.status(404).json({ message: "Movie not found" });
      }
      const movieImage = movieExist ? movieExist.image : null;

      const payment = new BookingDetails({
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

      await sendEmail(userEmail, payment, movieImage, seatNumbers);

      return res.status(200).json({
        message:
          "Payment successful. A confirmation Email has been sent. Please check your inbox.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
  }
};

module.exports = {
  order,
  verify,
};
