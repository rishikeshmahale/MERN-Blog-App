const express = require("express");
const router = express.Router();

const {
  registerController,
  loginController,
  logoutController,
  refetchUser
} = require("../controllers/authController.js");

// register || post
router.post("/register", registerController);

// login || post
router.post("/login", loginController);

// logout || post
router.get("/logout", logoutController);

// Refetch user // GET

router.get("/refetch", refetchUser);


module.exports = router;