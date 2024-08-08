const theaterRouter = require('express').Router();
const{addTheater,getTheaters} = require("../controllers/theaterControllers")
const adminMiddleware = require("../middlewares/forFindAdminID")



theaterRouter.post('/addTheater',adminMiddleware, addTheater)
theaterRouter.get('/getTheaters', getTheaters)

module.exports = theaterRouter;