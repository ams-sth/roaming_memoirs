// Importing required modules
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

// Importing routes and middlewares
const UserRoutes = require("./routes/user-routes");
const LogRoutes = require("./routes/log-routes");
const upload = require("./middlewares/upload");

// Configuring dotenv
dotenv.config();

// Initialize the express application
const app = express();

// Middleware setup
app.use(express.json());   // Middleware to parse JSON
app.use(cors());           // Enable CORS for cross-origin requests
app.use(morgan("dev"));    // HTTP request logger

// Static file serving
app.use("/uploads", express.static("public/uploads"));

// Routes setup
app.use("/api/v1", UserRoutes);  // User-related routes
app.use("/api/v1", LogRoutes);   // Log-related routes

// Simple route for testing server
app.get("/", (req, res) => {
  res.send("Server is working!");
});

// Route for handling image uploads
app.post("/images", upload.single("photo"), (req, res) => {
  console.log(req.file);  // Log the uploaded file details
  res.json(req.file);     // Respond with the file details
});

// Route for handling video uploads
app.post("/videos", upload.single("video"), (req, res) => {
  res.json(req.file);  // Respond with the uploaded video file details
});

// Handling 404 errors for undefined routes
app.use((req, res) => {
  res.status(404).send("<h1>Route not found</h1>");
});

// Export the app for use in other parts of the application
module.exports = app;
