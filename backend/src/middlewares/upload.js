// Import required modules
const multer = require("multer"); // For handling file uploads
const uuid = require("uuid").v4; // For generating unique IDs (not currently used in this code)
const path = require("path"); // For handling file paths and extensions

// Configure the storage engine for multer
const storage = multer.diskStorage({
  // Define the destination folder where uploaded files will be saved
  destination: (req, file, cb) => {
    // The file will be saved in the 'public/uploads' folder
    cb(null, "public/uploads");
  },

  // Define the filename for the uploaded file
  filename: (req, file, cb) => {
    // Save the file with its original name (could be customized to avoid overwriting)
    cb(null, `${file.originalname}`);
  },
});

// Define a file filter to restrict the types of files that can be uploaded
const fileFilter = (req, file, cb) => {
  // Get the file extension of the uploaded file
  const ext = path.extname(file.originalname.toLowerCase());

  // Check if the file extension matches allowed types (images and videos)
  if (!ext.match(/(png|jpg|jpeg|mp4|avi|mov)/)) {
    // Reject the file if the extension is not allowed
    return cb(
      new Error("Only png, jpg and jpeg, mp4, avi and mov are allowed")
    );
  }

  // If the file extension is valid, allow the file
  cb(null, true);
};

// Initialize multer with the defined storage and file filter configurations
const upload = multer({
  storage: storage,   // Use the custom storage configuration
  fileFilter: fileFilter, // Use the custom file filter to restrict file types
});

module.exports = upload;