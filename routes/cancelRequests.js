const cancelBookingRouter = require('express').Router()
const {cancelRequst,getCancelRequestsForUser}=require('../controllers/handleBookingCancellation')
const userMiddleware = require ("../middlewares/userMiddleware")

cancelBookingRouter.post('/bookings',cancelRequst)
cancelBookingRouter.get('/userBookings',userMiddleware,getCancelRequestsForUser)

module.exports=cancelBookingRouter