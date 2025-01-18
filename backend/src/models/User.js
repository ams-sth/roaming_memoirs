const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Encrypts the password before saving it to the database
userSchema.pre("save", async function (next) {
  // Check if the password field is modified or newly set
  if (!this.isModified("password")) {
    return next(); // Skip if the password hasn't changed
  }

  // Generate a salt with a cost factor of 10 to add randomness
  const salt = await bcrypt.genSalt(10);

  // Hash the password using the generated salt for security
  this.password = await bcrypt.hash(this.password, salt);

  // Proceed to the next middleware or save the document
  next();
});

// Generates a JSON Web Token (JWT) for user authentication
userSchema.methods.getJwtToken = function () {
  // Create a token containing the user's ID, signed with a secret key
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Token is valid for 1 day
  });
};

// Compares the provided password with the hashed password in the database
userSchema.methods.comparePassword = async function (enteredPassword) {
  // Use bcrypt's compare method to check if passwords match
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
