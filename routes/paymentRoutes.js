const paymentRoutes = require('express').Router();
const payLater = require("../controllers/payLaterController")
const userMiddleware = require('../middlewares/userMiddleware')
const{order,verify} = require("../controllers/razorPayController")





paymentRoutes.post('/payLater',userMiddleware,payLater)
paymentRoutes.post('/razorpay/order', order)
paymentRoutes.post('/razorpay/verify',userMiddleware,verify)




module.exports = paymentRoutes; 