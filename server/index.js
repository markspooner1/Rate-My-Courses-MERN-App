import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename, __dirname);
dotenv.config();
const app = express();

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://ratemycourses.onrender.com"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});
app.get('/pre-warm', (req, res) => {
  // Add any necessary initialization code here
  res.send('Server pre-warmed');
});


app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//Set directory of assets, its a static directory
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
//destination: which folder th uploaded file will be stored
//filename is used to determine what the file should be named inside the folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
//saves
const upload = multer({ storage });

//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

//Auth register
//For when a user wants to register
//user picture uploaded a picture to our public/assets folder
//then we call our register middleware in controllers folder
//grab picture property in http cal;

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* MONGOOSE SETUP */
//Connect to our database from Node server
const PORT = process.env.PORT || 3001;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    

    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });

    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    //User.insertMany(users);
    // Post.insertMany(posts)
  })
  .catch((error) => console.log(`${error} did not connect`));
