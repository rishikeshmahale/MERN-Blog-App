const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const connectDB = require('./database/db.js');

// routes
const authRoute = require('./routes/authRoute.js');
const userRoute = require('./routes/userRoute.js'); 
const postRoute = require('./routes/postRoute.js');
const commentRoute = require('./routes/commentRoute.js');

dotenv.config();

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());


// env variables
const MONGOURL = process.env.MONGO_URL;
const PORT = process.env.PORT;


// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);



//image upload
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images")
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img)
    // fn(null,"image1.jpg")
  }
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  // console.log(req.body)
  res.status(200).json("Image has been uploaded successfully!")
});



connectDB(MONGOURL);

// listen
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
