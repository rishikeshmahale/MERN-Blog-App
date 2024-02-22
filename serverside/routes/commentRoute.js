const express = require("express");
const router = express.Router();


const {
  createComment,
  updateComment,
  deleteComment,
  getComments,
} = require("../controllers/commentController.js");

const verifyToken = require("../middlewares/verifyToken.js");

// create comment || POST
router.post("/create", verifyToken, createComment);

// update comment || PUT
router.put("/:id", verifyToken, updateComment);

// delete comment || DELETE
router.delete("/:id", verifyToken, deleteComment);

// get comment || GET
router.get("/post/:postId", getComments);

module.exports = router;


