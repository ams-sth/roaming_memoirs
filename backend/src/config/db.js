const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    // Attempt to establish a connection to MongoDB
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    // Log a success message with the host information on successful connection
    console.log(`MongoDB is connected at:${connection.host}`);
  } catch (error) {
    // Log an error message if the connection fails
    console.error("Unable to connect with MongoDB \n".red.bold, error);
    // Exit the process with a failure status code (1)
    process.exit(1);
  }
};

module.exports = ConnectDB;
