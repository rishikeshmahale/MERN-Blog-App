const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(200).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err.message);
  }
};

const loginController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Invalid Crredentials" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "3d",
      }
    );

    const { password, ...info } = user._doc;

    return res.cookie("token", token).status(200).json(info);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err.message);
  }
};

const logoutController = async (req, res) => {
  try {
    return res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json({ message: "User logged out successfully!" });
  } catch (err) {
    console.log(err.message);
  }
};

const refetchUser = async (req, res) => {
  try {
    const token = req.cookie.token;

    jwt.verify(token, process.env.SECRET_KEY, {}, (err, data) => {
      if (err) {
        return res.status(404).json(err.message);
      }

      return res.status(200).json(data);
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  refetchUser,
};
