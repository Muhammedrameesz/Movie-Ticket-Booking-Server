const adminRouter = require('express').Router();
const {adminLogin,adminSignup,verifyAdmin,adminLogout,getAllOwners,verifyAdminAndOwner}= require('../controllers/adminControllers')
const {adminVerifyToken}= require('../utils/adminToken')


adminRouter.post('/signup', adminSignup)
adminRouter.post('/login', adminLogin)
adminRouter.get('/verifyAdmin', adminVerifyToken,verifyAdmin)
adminRouter.post('/logout', adminLogout)  
adminRouter.get('/allOwners',getAllOwners)
adminRouter.get('/roleCheck',adminVerifyToken,verifyAdminAndOwner)


module.exports = adminRouter;   