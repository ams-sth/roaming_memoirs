const express = require("express");
const { isAuth } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const {
  addLogs,
  getAllLogs,
  updateLogs,
  getLogsbyId
  // deleteLog,
} = require("../controllers/log-controller");
const LogRoutes = express.Router();

LogRoutes.get("/logs/", isAuth, getAllLogs);

LogRoutes.post("/addlogs/", isAuth, upload.single("logImage"), addLogs);

LogRoutes.put("/logs/:userId", isAuth, updateLogs);

// router.delete("/logs/:id", deleteLog);

module.exports = LogRoutes;
