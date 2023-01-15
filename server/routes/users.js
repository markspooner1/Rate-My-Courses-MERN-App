import express from "express";
import{ getUser, getUserFriends, addRemoveFriend } from "../controllers/users.js";
import {verifyToken} from "../middleware/auth.js";

const router = express.Router();

//match on specifc id (query string)
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

//update
router.patch("/:id/:friendID", verifyToken, addRemoveFriend);

export default router;