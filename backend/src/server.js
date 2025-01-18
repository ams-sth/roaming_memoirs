const app = require("./app");
const ConnectDB = require("./config/db");
const colors = require("colors");

const startServer = async () => {
  try {
    // Establish a connection to the database
    await ConnectDB();

    // Set the port either from the environment variable (process.env.PORT) or default to 3000 if not specified
    const port = process.env.PORT || 3000;

    // Start the server and listen on the specified port
    app.listen(port, () => {
      console.log(`Server is running at port ${port}`.green.bold.underline);
    });
  } catch (error) {
    // If the server fails to start, log the error and exit the process
    console.error("Failed to start the server".red.bold, error);
    process.exit(1);
  }
};

startServer();
