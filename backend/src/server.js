require("dotenv").config();
const app = require("./app");
const colors = require("colors");

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`.green.bold.underline);
});
