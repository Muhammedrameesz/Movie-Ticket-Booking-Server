const reviewRouter = require('express').Router();
const {reviews,getReviews}= require("../controllers/reviewController")
const {VerifyUserToken} = require("../utils/userToken")



reviewRouter.post('/addReview', VerifyUserToken,reviews)
reviewRouter.get('/getReviews/:id', getReviews)

module.exports = reviewRouter; 