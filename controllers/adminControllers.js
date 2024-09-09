const Admin = require("../model/adminSchema");
const bcrypt = require("bcrypt");
const { GenerateAdminToken } = require("../utils/adminToken");
const TeaterSchema = require("../model/theaterScema");


//    admin signup
const adminSignup = async (req, res) => {
  try {

    const { firstName, lastName, email, password } = req.body;
    if (!req.body) {
      return res.status(400).json({ message: "Incomplete data" });
    }
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(password, saltRounds);

    let role; 

    if (email ===process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      role = "admin";
    } else {
      role = "owner";
    }

    const admin = new Admin({
      firstName,
      lastName,
      email,
      password: hashpassword,
      role: role, 
    });
    await admin.save(); 
    const token = GenerateAdminToken(email);
    if (!token) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.cookie("adminToken", token, {
      httpOnly: true,      
      secure: true,        
      sameSite: 'None',    
    });
    res.status(201).json({ message: `${role} created successfully `});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!req.body) {
      return res.status(400).json({ message: "Incomplete data" });
    }
    const adminExist = await Admin.findOne({ email });
    if (!adminExist) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const Verifypassword = await bcrypt.compare(password, adminExist.password);
    if (!Verifypassword) {
      return res.status(401).json({ message: "password not match" });
    }
    const token = GenerateAdminToken(email);

    res.cookie("adminToken", token, {
      httpOnly: true,      
      secure: true,        
      sameSite: 'None',    
    });
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// admin verify

const verifyAdmin = async (req, res) => {
  try {
    const email = req.admin;
    if (!email) {
      return res.status(401).json({ message: "Admin not authenticated" });
    }

    const adminExist = await Admin.findOne({ email: email });

    if (!adminExist) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
 const adminLogout = async (req, res) => {  
  try {
      const adminToken = req.cookies.adminToken; 
      res.cookie('adminToken', '', {
          maxAge: 0, 
          httpOnly: true, 
          sameSite: "none", 
          secure: true, 
      });

      res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getAllOwners = async (req, res) => {
  try {
    const owners = await Admin.find({ role: "owner", status: "active" });
    if (owners.length === 0) {
      return res.status(404).json({ message: "No owners found" });
    }
    const ownerIds = owners.map((owner) => owner._id);
    const theatersWithOwnerIds = await TeaterSchema.find({ owner: { $in: ownerIds } });
    if (theatersWithOwnerIds.length === 0) {
      return res.status(404).json({ message: "No theaters found for the provided owners" });
    }
    const combinedData = theatersWithOwnerIds.map((theater) => {
      const owner = owners.find((owner) => owner._id.equals(theater.owner));
      if (!owner) {
        return {
          theaterName: theater.name,
          theaterLocation: theater.address,
          theaterContact: theater.contact,
          owner: "Owner details not found", 
        };
      }
      return {
        theaterName: theater.name,
        theaterLocation: theater.address,
        theaterContact: theater.contact,
        ownerId: owner._id,
        ownerFirstName: owner.firstName,
        ownerLastName: owner.lastName,
        ownerEmail: owner.email,
        createdAt: owner.createdAt,
      };
    });
    res.status(200).json({ message: "Request successful", data: combinedData,});
  } catch (error) {
    console.error("Error fetching owners or theaters:", error);
    res.status(500).json({message: "Internal server error",  error: error.message, });
  }
};
const verifyAdminAndOwner = async (req, res) => {
  try {
    const email = req.admin;
    if (!email) {
      return res.status(401).json({ message: "Admin not authenticated" });
    }
    const adminExist = await Admin.findOne({ email: email });
    if (!adminExist) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const roleCheck = adminExist.role
    res.status(200).json({ message: "Admin verified successfully" ,data:roleCheck});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  adminSignup,
  adminLogin,
  verifyAdmin,
  adminLogout,
  getAllOwners,
  verifyAdminAndOwner
};
