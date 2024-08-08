const {  userSignup, userLogin,verifyUser} =require('../controllers/userController')
const{  VerifyUserToken}= require('../utils/userToken')
const userRouter = require('express').Router()
// const verifyGtoken = require('../google/googleTokenVerify')




userRouter.post('/signup',userSignup)
userRouter.post('/login',userLogin)
userRouter.get('/verifyUser', VerifyUserToken, verifyUser) 
// userRouter.post('/googleLogin', verifyGtoken) 

module.exports = userRouter