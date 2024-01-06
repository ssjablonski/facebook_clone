import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true
        },
        location: String,
        description: String,
        userPicturePath: String,
        picturePath: String,
        privacy: {
            type: String,
            enum: ['public', 'private'],
            default: 'public',
        },
        likes: {
            type: Map,
            of: [],
        },
        comments: {
            type: Array,
            default: [],
        }
    }, { timestamps: true}
);

const Post = mongoose.model('Post', PostSchema);
export default Post;