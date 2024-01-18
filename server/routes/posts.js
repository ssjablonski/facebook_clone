import express from "express";
import { verifyToken } from '../middleware/auth.js';
import { createPost, deletePost, getFeedPost, getUserPost, likeUnlikePost, updatePost, addRemoveComment, getPostsCountByUser } from "../controllers/posts.js";

const router = express.Router();

router.get('/:userId', verifyToken, getFeedPost);

router.post('/create', verifyToken, createPost);

router.patch('/:id/update', verifyToken, updatePost);

router.delete('/:id/delete', verifyToken, deletePost);

router.get('/:id/posts', verifyToken, getUserPost);

router.patch('/:id/like', verifyToken, likeUnlikePost);

router.patch('/:id/comment', verifyToken, addRemoveComment)

router.get('/:userId/postsCountByUser', verifyToken, getPostsCountByUser);
export default router;