const express = require("express");
const { createPost, updatePost, deletePost, getPostDetails, getPosts, getUserSinglePost } = require("../controllers/postController");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken.js");

// create post  || POST
router.post("/create", verifyToken, createPost);

// update post  || PUT
router.put("/:id", verifyToken, updatePost);

// delete post  || DELETE
router.delete("/:id", verifyToken, deletePost);

// posts details  || GET
router.get("/:id", getPostDetails);

// get all posts  || GET
router.get("/", getPosts);

// get single user posts   ||  GET
router.get("/user/:userId" , getUserSinglePost)


module.exports = router;
