import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
    try {
        const {
            userId,
            description,
            picturePath,
            privacy,
            location
        } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            privacy,
            likes: {},
            comments: []
        }); 
        await newPost.save();

        const post = await Post.find()
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, picturePath, privacy, location } = req.body;
        const updated = await Post.findByIdAndUpdate(
            id, { description, picturePath, privacy, location }, { new: true }
        );
        res.status(200).json(updated);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        await Post.findByIdAndDelete(id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const getFeedPost = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        const friends = user.friends;

        const posts = await Post.find({
            $or: [
                { privacy: 'public' },
                { userId: { $in: friends }, privacy: 'private' }
            ]
        });

        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const getUserPost = async (req, res) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({ id });
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export const likeUnlikePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        if (!post.likes.includes(userId)) {
            post.likes.set(userId, true);
        } else {
            post.likes.delete(userId);
        }
        const updated = await Post.findByIdAndUpdate(
            id, {likes: post.likes}, {new: true}
        )
        res.status(200).json(updated);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}