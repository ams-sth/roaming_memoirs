const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const user_routes = require("./routes/user-routes");
const log_routes = require("./routes/log-routes");
const upload = require("./middlewares/upload");

//config
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1", user_routes);
app.use("/api/v1/", log_routes);

// app.use(express.static('public'))
app.use("/uploads", express.static("public/uploads"));

app.get("/", (res) => {
  res.send("Server is working!");
});

app.post("/images", upload.single("photo"), (req, res) => {
  console.log(req.filename);
  res.json(req.filename);
});

app.post("/videos", upload.single("video"), (req, res) => {
  res.json(req.file);
});

app.use("/", (req, res) => {
  res.send("<h1>Server is working</h1>");
});

module.exports = app;
