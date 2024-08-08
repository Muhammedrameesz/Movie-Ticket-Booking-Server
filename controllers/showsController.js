const Shows = require("../model/showsSchema");
const Theater = require("../model/theaterScema");
const Movie = require("../model/movieSchema");

const addShows = async (req, res) => {
  try {
    const { movieName, theaterName, dateTime, price } = req.body;
    

    if (!movieName || !theaterName || !theaterName || !price) {
      return res.status(400).json({ message: "Incomplete data" });
    }
    const movieExist = await Movie.findOne({ title: movieName });

    if (!movieExist) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const movieId = movieExist._id;

    const theaterExist = await Theater.findOne({ name: theaterName });
    if (!theaterExist) {
      return res.status(404).json({ message: "Theater not found" });
    }
    const theaterId = theaterExist._id;

    const shows = new Shows({
      movieId,
      theaterId,
      dateTime,
      price,
    });

    await shows.save();

    res.status(200).json({ message: "Show added successfully" });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const getShows = async (req, res) => {
  try {

    const { id } = req.params;
    
    const findShows = await Shows.find({ movieId: id }).lean(); 
    if (!findShows.length) {
      return res
        .status(404)
        .json({ message: "No shows found for the given movie ID" });
    }
    
    const movie = await Movie.findById(id).lean(); 
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }       

    const theaterIds = [
      ...new Set(findShows.map((show) => show.theaterId ? show.theaterId.toString() : null).filter(id => id !== null)),
    ];
  
    const theaters = await Theater.find({ _id: { $in: theaterIds } }).lean();
    const theaterMap = new Map(
      theaters.map((theater) => [theater._id.toString(), theater])
    );
    
    const showsWithTheaters = findShows.map((show) => {
      const theater = theaterMap.get(show.theaterId ? show.theaterId.toString() : "");
      if (!theater) {
        console.error(
          `Theater not found for show with theaterId ${show.theaterId}`
        );
      }
      return { ...show, theater };
    });
    res.status(200).json({ showsWithTheaters, movie });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  addShows,
  getShows,
};
