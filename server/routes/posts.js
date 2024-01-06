import express from "express";
import { verifyToken } from '../middleware/auth.js';
import { createPost, deletePost, getFeedPost, getUserPost, likeUnlikePost, updatePost } from "../controllers/posts.js";

const router = express.Router();

router.get('/', verifyToken, getFeedPost);

router.post('/create', verifyToken, createPost);

router.patch('/:id/update', verifyToken, updatePost);

router.delete('/:id/delete', verifyToken, deletePost);

router.get('/:id/posts', verifyToken, getUserPost);

router.patch('/:id/like', verifyToken, likeUnlikePost);

export default router;