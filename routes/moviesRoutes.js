const movieRoutes = require('express').Router()
const {addMovies,getMovies,getMoviesById,editMovies,deleteMovies} = require('../controllers/movieController')
const upload = require('../middlewares/upload')
const adminVerifyToken = require('../middlewares/forFindAdminID')




movieRoutes.post('/addMovies',upload.single("image"),adminVerifyToken,addMovies)
movieRoutes.get('/getMovies', getMovies)
movieRoutes.get('/getMoviesById/:id', getMoviesById)
movieRoutes.put('/editMovies/:id', upload.single("image"), adminVerifyToken, editMovies)
movieRoutes.delete('/deleteMovies/:id', deleteMovies)

module.exports = movieRoutes      