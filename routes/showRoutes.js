const showRouter = require('express').Router();
const {addShows,getShows}= require('../controllers/showsController')



showRouter.post('/addShows', addShows)
showRouter.get('/getShows/:id', getShows)

module.exports = showRouter;