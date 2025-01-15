const app = require("./app");
const ConnectDB = require("./config/db");

const port = process.env.PORT || 5000;

ConnectDB();

app.listen(port, () => {
  console.log(
    `Server is running at port :http://localhost:${port}`.cyan.underline.bold
  );
});
