import express from "express";
import { verifyToken } from '../middleware/auth.js';
import { addFriend, getUser, getUserFriends, removeFriend } from "../controllers/user.js";

const router = express.Router();

router.get('/:id', verifyToken, getUser);

router.get('/:id/friends', verifyToken, getUserFriends);

router.patch('/:id/:friendId/add', verifyToken, addFriend);

router.patch(':id/:friendId/remove', verifyToken, removeFriend)

export default router;
