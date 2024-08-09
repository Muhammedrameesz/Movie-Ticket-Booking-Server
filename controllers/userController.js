const User = require("../model/userSchema");
const bcrypt = require("bcrypt");
const { GenerateUserToken } = require("../utils/userToken");

//    User signup
const userSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } =  req.body;

    if (!req.body) {
      return res.status(400).json({ message: "Incomplete data" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashpassword,
    });

    await user.save();
    const token = GenerateUserToken(email);
    if (!token) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    res.cookie("userToken", token, {
      httpOnly: true,      
      secure: true,        
      sameSite: 'None',    
    });
    
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// User login
const userLogin = async (req, res) => {
  try {
    const { email, password } =  req.body;
    if (!req.body) {
      return res.status(400).json({ message: "Incomplete data" });
    }
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const Verifypassword = await bcrypt.compare(password, userExist.password);
    if (!Verifypassword) {
      return res.status(401).json({ message: "passoword not match" });
    }
    const token = GenerateUserToken(email);
    res.cookie("userToken", token, {
      httpOnly: true,      
      secure: true,        
      sameSite: 'None',    
    });
    
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// User verify

const verifyUser = async (req, res) => {
  try {
    const email = req.user;
    if (!email) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const userLogout = async (req, res) => {  
  try {
      const adminToken = req.cookies.userToken; 
      res.cookie('userToken', '', {
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
module.exports = {
  userSignup,
  userLogin,
  verifyUser,
  userLogout,
};
