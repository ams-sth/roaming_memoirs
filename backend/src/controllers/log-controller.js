const supabase = require("../config/supabase");

// Map snake_case DB columns → camelCase so the frontend stays unchanged
const mapLog = (log) => ({
  _id: log.id,
  id: log.id,
  tripName: log.trip_name,
  description: log.description,
  location: log.location,
  date: log.date,
  logImage: log.log_image,
  user: log.user_id,
  createdAt: log.created_at,
});

// Get all logs for the authenticated user
exports.getAllLogs = async (req, res) => {
  try {
    const { data: logs, error } = await supabase
      .from("logs")
      .select("*")
      .eq("user_id", req.user.id)
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ success: false, message: error.message });

    return res.status(200).json({ success: true, data: logs.map(mapLog) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Add a new log
exports.addLogs = async (req, res) => {
  try {
    const { tripName, description, location, date } = req.body;

    if (!tripName || !description || !location || !date) {
      return res.status(400).json({ success: false, message: "Please enter all fields!" });
    }

    const logImage = req.file ? req.file.originalname : null;

    const { data: log, error } = await supabase
      .from("logs")
      .insert({
        trip_name: tripName,
        description,
        location,
        date,
        log_image: logImage,
        user_id: req.user.id,
      })
      .select()
      .single();

    if (error) return res.status(500).json({ success: false, message: error.message });

    return res.status(201).json({
      success: true,
      message: "Log added successfully!",
      data: mapLog(log),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update an existing log
exports.updateLogs = async (req, res) => {
  try {
    const { userId: id } = req.params;
    const { tripName, description, location, date } = req.body;

    const { data: log, error } = await supabase
      .from("logs")
      .update({
        ...(tripName && { trip_name: tripName }),
        ...(description && { description }),
        ...(location && { location }),
        ...(date && { date }),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) return res.status(500).json({ success: false, message: error.message });

    return res.status(200).json({
      success: true,
      message: "Log updated successfully!",
      data: mapLog(log),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
