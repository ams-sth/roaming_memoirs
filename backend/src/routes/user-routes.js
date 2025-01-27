const express = require("express");
const {
  register,
  login,
  getProfile,
} = require("../controllers/user-controller");
const { isAuth } = require("../middlewares/auth");
const UserRoutes = express.Router();

UserRoutes.post("/register", register);
UserRoutes.post("/login", login);
UserRoutes.get("/me", isAuth, getProfile);

module.exports = UserRoutes;
