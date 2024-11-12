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
const router = express.Router();

router.get("/logs/", isAuth, getAllLogs);

router.post("/addlogs/", isAuth, upload.single("logImage"), addLogs);

router.put("/logs/:userId", isAuth, updateLogs);

// router.delete("/logs/:id", deleteLog);

module.exports = router;
