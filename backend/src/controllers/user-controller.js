const Log = require("../models/Log");
const User = require("../models/User");

// Register API
exports.register = async (req, res) => {
  try {
    // Destructure user details from the request body
    const { username, email, password } = req.body;

    // Validate if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    // Validate password complexity using a regex pattern
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    // Check if an account with the given email already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists!",
      });
    }

    // Create a new user and save it to the database
    const user = await User.create({
      username,
      email,
      password,
    });

    // Respond with a success message and the created user
    return res.status(201).json({
      success: true,
      message: "User added successfully!",
      user,
    });
  } catch (error) {
    // Handle any server errors
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login API
exports.login = async (req, res) => {
  try {
    // Extract login credentials from the request body
    const { email, password } = req.body;

    // Validate if all required fields are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields!",
      });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email doesn't exist!",
      });
    }

    // (Optional) Check if the user has reached the maximum login attempts
    // Uncomment and implement logic for tracking login attempts if needed
    // if (user.loginAttempts >= 5) {
    //   return res.status(401).json({
    //     success: false,
    //     message: "Maximum login attempts reached. Your account is locked.",
    //   });
    // }

    // Compare the provided password with the stored hashed password
    const matchPassword = await user.comparePassword(password);
    if (!matchPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials!",
      });
    }

    // Generate a JWT token for authentication
    const token = user.getJwtToken();

    // Respond with a success message, user details, and the token
    res.status(201).json({
      success: true,
      message: "Login successful!",
      user,
      token,
    });
  } catch (error) {
    // Handle any server errors
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Profile API
exports.getProfile = async (req, res) => {
  try {
    // Fetch the user by ID using the ID from the authenticated request
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    // Respond with the user details
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    // Handle any server errors
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
