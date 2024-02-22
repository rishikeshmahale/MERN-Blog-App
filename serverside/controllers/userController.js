const User = require("../models/userModel.js");
const Post = require("../models/postModel.js");
const Comment = require("../models/commentModel.js");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    const { password, ...info } = user._doc;

    return res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);

      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "User Updated Successfuly", updatedUser });
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    await Post.deleteMany({ userId: id });

    await Comment.deleteMany({ userId: id });

    return res.status(200).json({ message: "User has been deleted" });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { getUsers, updateUser, deleteUser };
