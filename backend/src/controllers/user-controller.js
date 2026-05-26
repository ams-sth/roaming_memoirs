const supabase = require("../config/supabase");

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: "Please enter all fields" });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    // Create user via Supabase Auth admin (auto-confirms email)
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    // Store username in profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({ id: data.user.id, username, role: "user" });

    if (profileError) {
      return res.status(500).json({ success: false, message: profileError.message });
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: { id: data.user.id, email: data.user.email, username },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please enter all fields!" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    // Fetch username from profiles
    const { data: profile } = await supabase
      .from("profiles")
      .select("username, role")
      .eq("id", data.user.id)
      .single();

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        username: profile?.username,
        role: profile?.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("username, role")
      .eq("id", req.user.id)
      .single();

    if (error) {
      return res.status(500).json({ success: false, message: error.message });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        username: profile?.username,
        role: profile?.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
