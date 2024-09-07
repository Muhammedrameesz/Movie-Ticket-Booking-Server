const cancelBookingRouter = require('express').Router()
const {cancelRequst,getCancelRequestsForUser,getCanceleationForAdmin}=require('../controllers/handleBookingCancellation')
const userMiddleware = require ("../middlewares/userMiddleware")
const adminMiddleware = require ("../middlewares/forFindAdminID")


cancelBookingRouter.post('/bookings',cancelRequst)
cancelBookingRouter.get('/userBookings',userMiddleware,getCancelRequestsForUser)
cancelBookingRouter.get('/cancellationRequestForAdmin',adminMiddleware,getCanceleationForAdmin)


module.exports=cancelBookingRouter