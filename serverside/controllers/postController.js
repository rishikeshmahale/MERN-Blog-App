const Post = require("../models/postModel.js");
const Comment = require("../models/commentModel.js");
const bcrypt = require("bcrypt");

// create post
const createPost = async (req, res) => {
  try {
    const newPost = new Post(req.body);

    const savedPost = await newPost.save();

    return res
      .status(200)
      .json({ message: "Post created successfully", savedPost });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// update single post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// delete single post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await Post.findByIdAndDelete(id);

    await Comment.deleteMany({ postId: id });

    return res.status(200).json("Post has been deleted!");
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// get single post details
const getPostDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// get posts
const getPosts = async (req, res) => {
  const query = req.query;

  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };

    const posts = await Post.find(query.search ? searchFilter : null);

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

// get single user posts
const getUserSinglePost = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });

    return res.status(200).json(posts);

  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = {
  getPosts,
  getPostDetails,
  createPost,
  updatePost,
  deletePost,
  getUserSinglePost,
};
