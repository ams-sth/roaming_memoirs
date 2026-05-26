const supabase = require("../config/supabase");

exports.isAuth = async (req, res, next) => {
  const token = req?.headers?.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ success: false, message: "Please login first!" });
  }

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ success: false, message: "Invalid or expired token!" });
  }

  req.user = user;
  next();
};
