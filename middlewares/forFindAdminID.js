const jwt = require('jsonwebtoken');

const adminSecret = process.env.ADMIN_SECRET_KEY
const adminVerifyToken = async (req, res, next) => {
  
    try {
      const token = req.cookies.adminToken;
     
      if (!token) return res.status(401).json({ message: "Unauthorized" });
      const decoded = jwt.verify(token, adminSecret);
  
      if (!decoded) return res.status(401).json({ message: "Invalid token" });

      req.admin = decoded.data;
      next();
    } catch (error) {
      console.log("errorVerifyAdmin", error);
      return res.status(401).json({ message: "Invalid token" });
    }
  };

  module.exports =adminVerifyToken
 


