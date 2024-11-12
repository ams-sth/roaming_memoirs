const Log = require("../models/Log");

exports.getAllLogs = async (req, res, next) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = req.user.id;

    let logs = await Log.find({ user: userId }).populate("user", "email");
    if (!logs || logs.length === 0) {
      return res.status(404).json({ error: "Logs not found for the user" });
    }
    res.status(200).json({ success: true, data: logs });
  } catch (err) {
    next(err);
  }
};

exports.addLogs = async (req, res, next) => {
  try {
    const { tripName, description, location, date } = req.body;
    if (!tripName || !description || !location || !date) {
      return res.status(400).json({
        success: false,
        message: "please enter all field!",
      });
    }

    const logImage = req.file ? req.file.originalname : null;
    console.log("data", logImage);

    const log = await Log.create({
      tripName,
      description,
      location,
      date,
      logImage: logImage,
      user: req.user.id,
    });
    res.status(201).json({
      success: true,
      message: "Log added successFully!",
      data: log,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateLogs = async (req, res) => {
  const { id } = req.params;  // Get the ID from URL params
  const { tripName, description, location, date } = req.body;  // Get the updated values from the request body

  try {
    // Find the log by ID
    const existingLogs = await Log.findById(id);

    // If the log doesn't exist, return an error response
    if (!existingLogs) {
      return res.status(404).json({ message: "No such logs exist" });
    }

    // Update fields only if the new values are provided
    existingLogs.tripName = tripName || existingLogs.tripName;
    existingLogs.description = description || existingLogs.description;
    existingLogs.location = location || existingLogs.location;
    existingLogs.date = date || existingLogs.date;

    // Save the updated log
    await existingLogs.save();

    // Return success response with updated data
    res.status(200).json({
      success: true,
      message: "Logs updated successfully",
      data: existingLogs,
    });
  } catch (error) {
    console.error(error);
    // Return error response in case of an exception
    res.status(500).json({ message: error.message });
  }
};


// exports.deleteLog = async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const deletedLog = await Log.findByIdAndRemove(id);

//     if (!deletedLog) {
//       return res.status(404).json({ message: "Unable To Delete" });
//     }

//     res.status(200).json({ message: "Successfully Deleted" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };
