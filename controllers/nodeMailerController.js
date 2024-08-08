const nodemailer = require("nodemailer");
const { format } = require("date-fns");

const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
    user: process.env.USER_NAME,
    pass: process.env.USER_PASSWORD,
  },
});

const sendPaymentEmail = async (to, paymentDetails, image,seatNumbers) => {
 
  const formattedDate = format(new Date(paymentDetails.date), "PPP"); 
  const seatNumberse = Array.isArray(seatNumbers) ? seatNumbers : [];

  const htmlContent = `
    <div style="width: 600px; margin: 0 auto; border: 1px solid #ccc; padding: 20px;">
      <h1>Booking Confirmation</h1>
      <img src="${image}" alt="Movie Poster" style="height:70px; width:70px; margin-bottom: 5px;">
      <p>Thank you for your booking. Here are your booking details:</p>
      <p><strong>Movie Name:</strong> ${paymentDetails.movieName}</p>
      <p><strong>Theater:</strong> ${paymentDetails.theaterName}</p>
      <p><strong>Seats:</strong> ${seatNumberse.length > 0 ? seatNumbers.join(", ") : "N/A"}</p>
      <p><strong>Date:</strong> ${formattedDate}</p>
      <p><strong>Time:</strong> ${paymentDetails.time}</p>
      <p><strong>Location:</strong> ${paymentDetails.location}</p>
      <p><strong>Total Reservation:</strong> ${paymentDetails.totalReservation}</p>
      <p><strong>Total Price:</strong> ₹${paymentDetails.amount}</p>
      <p><strong>Payment Status:</strong> ${paymentDetails.paymentStatus}</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.USER_NAME,
    to,
    subject: "Booking Confirmation",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendPaymentEmail;
