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
  const { id } = req.params;
  const { tripName, description, location, date } = req.body;
  try {
    const existingLogs = await Log.findById(id);

    if (!existingLogs) {
      return res.status(404).json({ message: "No such Logs exists" });
    }
    existingLog.tripName = tripName || existingLog.tripName;
    existingLog.description = description || existingLog.description;
    existingLog.location = location || existingLog.location;
    existingLog.date = date || existingLog.date;

    await existingLog.save();

    res.status(200).json({
      success: true,
      message: "Logs updated successfully",
      data: existingLogs,
    });
  } catch (error) {
    console.error(error);
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
