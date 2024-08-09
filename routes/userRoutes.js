const {  userSignup, userLogin,verifyUser,userLogout} =require('../controllers/userController')
const{  VerifyUserToken}= require('../utils/userToken')
const userRouter = require('express').Router()





userRouter.post('/signup',userSignup)
userRouter.post('/login',userLogin)
userRouter.get('/verifyUser', VerifyUserToken, verifyUser) 
userRouter.post('/logout', userLogout)  


module.exports = userRouter