const cloudinaryIntance = require("../config/Cloudinary");
const Movies = require("../model/movieSchema");
const Admin = require("../model/adminSchema");

//  Add Movies
const addMovies = async (req, res) => {
  try {
    if (!req.file) {
      console.log("No files uploaded");
      return res.status(400).send("No files uploaded");
    }

    const result = await cloudinaryIntance.uploader.upload(req.file.path, {
      folder: "movieTicketBooking",
    });

    const imageUrl = result.url;
    const data = req.body;

    if (!data) {
      return res.status(400).json({ message: "Incomplete data" });
    }

    const adminEmail = req.admin;
    const adminExist = await Admin.findOne({ email: adminEmail });
    if (!adminExist) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const {
      title,
      language,
      category,
      description,
      status,
      iframeUrl,
      rating,
      duration,
      releaseDate,
    } = data;

    const newMovie = new Movies({
      title,
      language,
      category,
      description,
      status,
      image: imageUrl,
      iframeUrl,
      rating,
      duration,
      admin: adminExist._id,
      date:releaseDate
    });

    await newMovie.save();

    return res.status(200).json({ message: "Success", data: newMovie });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Get Movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movies.find();
    return res.status(200).json({ movies: movies });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Movis ByID
const getMoviesById = async (req, res) => {
  try {
    const { id } =  req.params;
    const movie = await Movies.findById(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    return res.status(200).json({ movie: movie });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Delete Movies
const deleteMovies = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Movie ID is required" });
    }

    const findMovies = await Movies.findById(id);
    if (!findMovies) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const folderName = 'movieTicketBooking'; 
    const imagePath= findMovies.image.split('/').slice(-folderName.split('/').length - 1).join('/');
    const imagePublicId = imagePath.split('.')[0];
    await cloudinaryIntance.uploader.destroy(imagePublicId);

    const deleted = await Movies.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Movie not deleted" });
    }
      
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//  Update & Edit Movies

const editMovies = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Movie ID is required" });
    }

    const findMovies = await Movies.findById(id);
    if (!findMovies) {
      return res.status(404).json({ message: "Movie not found" });
    }


    const folderName = 'movieTicketBooking'; 
    const imagePath= findMovies.image.split('/').slice(-folderName.split('/').length - 1).join('/');
    const imagePublicId = imagePath.split('.')[0];
    await cloudinaryIntance.uploader.destroy(imagePublicId);
  

    if (!req.file) {
      console.log("No files uploaded");
      return res.status(400).send("No files uploaded");
    }

    const result = await cloudinaryIntance.uploader.upload(req.file.path, {
      folder: "movieTicketBooking",
    });

    const imageUrl = result.url;
    const data = req.body;
    if (!data) {
      return res.status(400).json({ message: "Incomplete data" });
    }
        console.log('data',data);
    const adminEmail = req.admin;
    const adminExist = await Admin.findOne({ email: adminEmail });
    if (!adminExist) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const {
      title,
      language,
      category,
      description,
      status,
      iframeUrl,
      rating,
      duration,
      releaseDate,
    } = data;

    const updateMovie = await Movies.findByIdAndUpdate(
      id,
      {
        title,
        language,
        category,
        description,
        status,
        image: imageUrl,
        iframeUrl,
        rating,
        duration,
        date:releaseDate,
        admin: adminExist._id,

      },
      { new: true }
    );

    if (!updateMovie) {
      return res.status(400).json({ message: "Failed to update movie" });
    }
         
    return res.status(200).json({ message: "Success", data: updateMovie });
  } catch (error) {
    console.error("error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addMovies,
  getMovies,
  getMoviesById,
  deleteMovies,
  editMovies,
};
