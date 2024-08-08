const Theater = require("../model/theaterScema");
const Admin = require("../model/adminSchema");

const addTheater = async (req, res) => {
    
  try {
    const ownerEmail = req.admin;
    const ownerExist = await Admin.findOne({ email: ownerEmail });
    if (!ownerExist) {
      return res.status(401).json({ message: "Admin not found" });
    }
    const ownerId = ownerExist._id;
    
    const { name, address,contact } = req.body;
    if (!req.body) {
      return res.status(400).json({ message: "Incomplete data" });
    }
    const theaterExist = await Theater.findOne({ name, address });
    if (theaterExist) {
      return res.status(400).json({ message: "Theater already exists" });
    }
    const theater = new Theater({
      name,
      address,
      contact,
      owner: ownerId,
    });
    await theater.save();
    res.status(200).json({ message: "Theater added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find();
    res.status(200).json({data:theaters });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addTheater,
  getTheaters,
};
