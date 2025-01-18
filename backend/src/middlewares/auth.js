// Importing required modules
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to check if the user is authenticated
exports.isAuth = async (req, res, next) => {
  let token = ""; // Variable to hold the token from request headers

  // Attempt to get the token from the Authorization header
  token = token ? token : req?.headers?.authorization;

  // If a token is found in the Authorization header, remove the "Bearer " prefix
  token = token?.replace("Bearer ", "");

  // If no token is found, respond with a 401 Unauthorized status
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login first!", // Prompt to login if there's no token
    });
  }

  try {
    // Decode the token using the secret key and extract the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID (decoded from the token) in the database
    const user = await User.findById({ where: { id: decoded.id } });

    // If the user doesn't exist in the database, return a 400 Bad Request status
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exist!", // If user is not found, return error
      });
    }

    // Attach the user object to the request object for use in later middleware/routes
    req.user = user;

    // Proceed to the next middleware/route handler
    next();
  } catch (error) {
    // If there's any error while verifying the token (e.g., expired token), return a 401 status
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token!",
    });
  }
};