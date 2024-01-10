import React from 'react'
import Avatar from '@mui/material/Avatar';



function Post({info}) {
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
    const likeCount = Object.keys(likes).length;
    
    return (
        <div className="post bg-white shadow-md rounded-md p-4 mb-2">
            <div className="post-header flex items-center">
                <Avatar alt={firstName} src={userPicturePath} />
                <div className="user-info pl-4">
                    <h3 className="text-lg font-medium">{firstName} {lastName}</h3>
                    <p className="text-gray-500">Location: {location}</p>
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