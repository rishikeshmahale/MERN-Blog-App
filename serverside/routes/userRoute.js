const express = require("express");
const router = express.Router();
// const Post = require("../models/Post");
// const Comment = require("../models/Comment");
// const verifyToken = require("../verifyToken");
const verifyToken = require("../middlewares/verifyToken.js");

const {
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");

// Get single user || GET
router.get("/:id", getUsers);

// update user || PUT
router.put("/:id", verifyToken, updateUser);

// delete user || DELETE
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
