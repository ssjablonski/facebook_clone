import React from 'react'
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePost } from 'reducer';




function Post({info, how}) {
    const {
        _id,
        userId,
        firstName,
        lastName,
        description,
        location,
        picturePath,
        userPicturePath,
        likes,
        comments,
    } = info;
    const [render, setRender] = how
    const likeCount = Object.keys(likes).length;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token)

    async function handleDelete() {
        const deletePostFetch = await fetch(`http://localhost:3001/posts/${_id}/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const deletePostRes = await deletePostFetch.json();

        if (deletePostFetch.status === 200) {
            dispatch(deletePost(_id))
            setRender(true)
        }
    }
    
    return (
        <div className="post bg-white shadow-md rounded-md p-4 mb-2">
            <div className="post-header flex items-center">
                <Avatar alt={firstName} src={userPicturePath} />
                <div className="user-info pl-4">
                    <h3 className="text-lg font-medium">{firstName} {lastName}</h3>
                    <p className="text-gray-500">Location: {location}</p>
                    {user._id === userId && 
                        <button onClick={() => handleDelete()}>
                            <DeleteIcon />
                        </button>}
                </div>
            </div>
            <div className="post-content mt-4">
                <p>{description}</p>
                <img className="post-picture mt-4" src={picturePath} alt="Post" />
            </div>
            <div className="post-footer justify-between mt-4">
                <div className="text-gray-500">Likes: {likeCount}</div>
                <div className="comments items-center">
                    <div className="text-gray-500">Comments:</div>
                    <div className='flex flex-col'>
                        {comments.map((comment) => {
                            return (
                                <div className="comment">
                                    <p>{comment}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post