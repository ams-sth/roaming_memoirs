const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const UserRoutes = require("./routes/user-routes");
const LogRoutes = require("./routes/log-routes");
const upload = require("./middlewares/upload");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use("/assets/images", express.static("assets/images"));

app.use("/api/v1", UserRoutes);
app.use("/api/v1", LogRoutes);

app.get("/", (req, res) => res.send("Server is working!"));

app.post("/images", upload.single("photo"), (req, res) => res.json(req.file));

app.use((req, res) => res.status(404).send("<h1>Route not found</h1>"));

module.exports = app;
