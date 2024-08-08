const router = require('express').Router()
const userRouter = require('./userRoutes')
const adminRouter = require('./adminRoutes')
const movieRouter = require('./moviesRoutes')
const reviewRouter = require('./reviewRoutes')
const theatersRouter = require("./theaterRoutes")
const showRouter = require("./showRoutes")
const paymentRouter = require("./paymentRoutes")
const getBookingRoter = require('./getBookingRoutes')


router.use('/admins', adminRouter)
router.use('/users', userRouter)
router.use('/movies', movieRouter)
router.use('/reviews', reviewRouter)
router.use('/theaters', theatersRouter)
router.use('/shows', showRouter)
router.use('/payments', paymentRouter)
router.use('/getBooking', getBookingRoter)


module.exports = router;