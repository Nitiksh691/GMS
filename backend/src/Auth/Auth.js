const jwt = require('jsonwebtoken');
const GymUser = require("../Models/Gym");

const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.cookie_token;

    if (!token) {
      return res.status(401).json({ message: "No Token, authentication denied!" });
    }

    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);

    // Find the user from the database using the ID in the token
    req.user = await GymUser.findById(decoded.gym_id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Invalid token, user not found!" });
    }

    // Continue to the next middleware/controller
    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.status(401).json({ error: "Token is not valid!" });
  }
};

module.exports = Auth;
