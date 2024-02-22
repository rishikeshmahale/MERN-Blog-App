const Comment = require("../models/commentModel.js");

const createComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);

    const savedComment = await newComment.save();

    return res
      .status(201)
      .json({ message: "Comment saved Successfully", savedComment });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};


const updateComment = async (req, res) => {
  try {

    const { id } = req.params;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Comment updated successfully", updatedComment });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};


const deleteComment = async (req, res) => {
  try {

    const { id } = req.params;

    await Comment.findByIdAndDelete(id);

    return res.status(200).json({message : "Comment has been deleted!"});
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });

    return res.status(200).json(comments);

  } catch (err) {
    return res.status(500).json(err.message);
  }
};
module.exports = {
  createComment,
  deleteComment,
  updateComment,
  getComments,
};
