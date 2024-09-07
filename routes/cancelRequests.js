const cancelBookingRouter = require('express').Router()
const {cancelRequst,getCancelRequestsForUser,getCanceleationForAdmin,updateCancelBookings}=require('../controllers/handleBookingCancellation')
const userMiddleware = require ("../middlewares/userMiddleware")
const adminMiddleware = require ("../middlewares/forFindAdminID")


cancelBookingRouter.post('/bookings',cancelRequst)
cancelBookingRouter.get('/userBookings',userMiddleware,getCancelRequestsForUser)
cancelBookingRouter.get('/cancellationRequestForAdmin',adminMiddleware,getCanceleationForAdmin)
cancelBookingRouter.put('/confirmCancel',updateCancelBookings)



module.exports=cancelBookingRouter