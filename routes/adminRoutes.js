const adminRouter = require('express').Router();
const {adminLogin,adminSignup,verifyAdmin}= require('../controllers/adminControllers')
const {adminVerifyToken}= require('../utils/adminToken')


adminRouter.post('/signup', adminSignup)
adminRouter.post('/login', adminLogin)
adminRouter.get('/verifyAdmin', adminVerifyToken,verifyAdmin)

module.exports = adminRouter;   