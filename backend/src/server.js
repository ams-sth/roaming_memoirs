const app = require("./app");
const ConnectDB = require("./config/db");

const startServer = async () => {
  try {
    await ConnectDB();

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`Server is running at port :http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Error connecting to the MongoDB:", error);
    process.exit(1);
  }
};

startServer();
