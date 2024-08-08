const getBookingRoter =require('express').Router()
const { userBookings,allBookings,ownerBookings} = require("../controllers/getBookingController")
const userMiddleware = require('../middlewares/userMiddleware')
const adminMiddleware = require("../middlewares/forFindAdminID")




getBookingRoter.get('/userBookings',userMiddleware, userBookings)
getBookingRoter.get('/allBookings', allBookings)
getBookingRoter.get('/ownerBookings',adminMiddleware, ownerBookings)


module.exports = getBookingRoter;