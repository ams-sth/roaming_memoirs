const Log = require("../models/Log");

// Get all logs for a specific user
exports.getAllLogs = async (req, res, next) => {
  try {
    // Ensure the user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    // Get the authenticated user's ID
    const userId = req.user.id;

    // Fetch logs for the user and populate the 'user' field with the 'email' attribute
    let logs = await Log.find({ user: userId }).populate("user", "email");

    // If no logs are found, respond with a 404 error
    if (!logs || logs.length === 0) {
      return res.status(404).json({ error: "Logs not found for the user" });
    }

    // Respond with the logs
    res.status(200).json({ success: true, data: logs });
  } catch (err) {
    // Pass any errors to the next middleware
    next(err);
  }
};

// Add a new log
exports.addLogs = async (req, res, next) => {
  try {
    // Extract log details from the request body
    const { tripName, description, location, date } = req.body;

    // Ensure all required fields are provided
    if (!tripName || !description || !location || !date) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields!",
      });
    }

    // Get the uploaded file name if it exists
    const logImage = req.file ? req.file.originalname : null;

    // Create a new log in the database
    const log = await Log.create({
      tripName,
      description,
      location,
      date,
      logImage,
      user: req.user.id, // Associate the log with the authenticated user
    });

    // Respond with the created log
    res.status(201).json({
      success: true,
      message: "Log added successfully!",
      data: log,
    });
  } catch (error) {
    // Pass any errors to the next middleware
    next(error);
  }
};

// Update an existing log
exports.updateLogs = async (req, res) => {
  const { id } = req.params; // Extract the log ID from the URL parameters
  const { tripName, description, location, date } = req.body; // Extract the updated values from the request body

  try {
    // Find the log by its ID
    const existingLogs = await Log.findById(id);

    // If the log does not exist, respond with a 404 error
    if (!existingLogs) {
      return res.status(404).json({ message: "No such logs exist" });
    }

    // Update the fields only if new values are provided
    existingLogs.tripName = tripName || existingLogs.tripName;
    existingLogs.description = description || existingLogs.description;
    existingLogs.location = location || existingLogs.location;
    existingLogs.date = date || existingLogs.date;

    // Save the updated log to the database
    await existingLogs.save();

    // Respond with the updated log
    res.status(200).json({
      success: true,
      message: "Logs updated successfully",
      data: existingLogs,
    });
  } catch (error) {
    console.error(error);
    // Respond with a 500 error in case of an exception
    res.status(500).json({ message: error.message });
  }
};

// Delete a log (commented out)
// exports.deleteLog = async (req, res, next) => {
//   try {
//     const id = req.params.id; // Get the log ID from the URL parameters
//     const deletedLog = await Log.findByIdAndRemove(id); // Remove the log by its ID

//     // If the log does not exist, respond with a 404 error
//     if (!deletedLog) {
//       return res.status(404).json({ message: "Unable to delete" });
//     }

//     // Respond with a success message
//     res.status(200).json({ message: "Successfully deleted" });
//   } catch (error) {
//     console.error(error);
//     // Respond with a 500 error in case of an exception
//     res.status(500).json({ message: error.message });
//   }
// };
