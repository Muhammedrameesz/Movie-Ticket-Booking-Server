const jwt = require("jsonwebtoken");

const secret = process.env.USER_TOKEN_SECRET;

const VerifyUserToken = async (req, res, next) => {
  try {
    const token = req.cookies.userToken;
    if (!token) {
      return res
        .status(403)
        .send({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, secret);

    if (!decoded) {
      return res.status(403).send({ message: "Access denied. Invalid token." });
    }

    req.user = decoded.data;
    next();
  } catch (error) {
    console.error("JWT error:", error);
    return res.status(403).send({ message: "Access denied. Invalid token." });
  }
};

module.exports = VerifyUserToken

