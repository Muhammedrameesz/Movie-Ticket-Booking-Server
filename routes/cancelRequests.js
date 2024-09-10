const cancelBookingRouter = require('express').Router()
const {
    cancelRequst,
    getCancelRequestsForUser,
    getCanceleationForAdmin,
    updateCancelBookings,
    deleteBookings,
    getCanceleSeats,
   clearCanceledSeats
}=require('../controllers/handleBookingCancellation')
const userMiddleware = require ("../middlewares/userMiddleware")
const adminMiddleware = require ("../middlewares/forFindAdminID")


cancelBookingRouter.post('/bookings',cancelRequst)
cancelBookingRouter.get('/userBookings',userMiddleware,getCancelRequestsForUser)
cancelBookingRouter.get('/cancellationRequestForAdmin',adminMiddleware,getCanceleationForAdmin)
cancelBookingRouter.put('/confirmCancel',updateCancelBookings)
cancelBookingRouter.delete('/deleteBookings',deleteBookings)
cancelBookingRouter.get('/canceledSeats',getCanceleSeats)
cancelBookingRouter.delete('/clearSeatsSchema',clearCanceledSeats)




module.exports=cancelBookingRouter