import express from "express";
import {getFeedPosts, getUserPosts, getSpecifcPosts, getCourses} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
//all posts

router.get("/", verifyToken, getFeedPosts);
router.get("/course", verifyToken, getCourses);

router.get("/:courseId", verifyToken, getSpecifcPosts);

//posts for specific user
router.get("/:userId", verifyToken, getUserPosts);



export default router;