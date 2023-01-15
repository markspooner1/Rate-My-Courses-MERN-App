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
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js";
import {register} from "./controllers/auth.js"
import {createPost} from "./controllers/posts.js"
import { verifyToken } from "./middleware/auth.js";
import User from "./Models/user.js"
import Post from "./Models/Post.js";
import {users, posts} from "./data/index.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
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


//Authentication vs Authorization
// Authentication: registering + logging in
// Authorization: when we want to make sure that an action taken by a user is valid
//Auth register
//For when a user wants to register
//user picture uploaded a picture to our public/assets folder
//then we call our register middleware in controllers folder
//grab picture property in http call
app.post("/auth/register", upload.single("picture"), register) 
app.post("/posts", verifyToken, upload.single("picture"), createPost);
//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
//Connect to our database from Node server
const PORT = process.env.PORT || 3001;
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

     //User.insertMany(users);
    // Post.insertMany(posts)
  })
  .catch((error) => console.log(`${error} did not connect`));
