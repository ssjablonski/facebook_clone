import React, { useContext, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deletePost, setFriends, setPost } from 'reducer';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PublicIcon from '@mui/icons-material/Public';
import { PersonAdd } from '@mui/icons-material';
import { ThemeContext } from 'context/ThemeContext';
import PostForm from './PostForm';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import AddCommentIcon from '@mui/icons-material/AddComment';
import SendIcon from '@mui/icons-material/Send';



function Post({info}) {
    const {
        _id,
        userId,
        firstName,
        lastName,
        description,
        location,
        picture,
        userPicture,
        likes,
        comments,
        privacy,
    } = info;
    const { setRender} = useContext(ThemeContext)
    const [isEditing, setIsEditing] = useState(false)
    const likeCount = Object.keys(likes).length;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token)
    const { paleta } = useContext(ThemeContext);
    const [comment, setComment] = useState('')

    async function handleDelete() {
        const deletePostFetch = await fetch(`http://localhost:3001/posts/${_id}/delete`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (deletePostFetch.status === 200) {
            dispatch(deletePost(_id))
            setRender(true)
        }
    }
    
    async function handleLike() {
        const likeFetch = await fetch(`http://localhost:3001/posts/${_id}/like`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user._id,
            }),
        });
        const likeRes = await likeFetch.json();
        dispatch(setPost(likeRes))
        setRender(true)
    }


    async function handleAddFriend() {
        const addFriendFetch = await fetch(`http://localhost:3001/user/${user._id}/${userId}/add`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const addFriendRes = await addFriendFetch.json();
        dispatch(setFriends({ friends: addFriendRes }))
        setRender(true)
    }

    async function handleComment() {
        const commentFetch = await fetch(`http://localhost:3001/posts/${_id}/comment`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                comment: comment,
                userPicture: user.picture,
            }),
        });
        const commentRes = await commentFetch.json();
        dispatch(setPost(commentRes))
        setRender(true)
        setComment('')
    }


    function handleChange(e) {
        setComment(e.target.value)
    }

    return (
        <div className={`${paleta.primary} ${paleta.text} shadow-md rounded-md p-4 mb-2`}>
            {isEditing ? <PostForm 
                setIsEditing={setIsEditing} 
                handleDelete={handleDelete} 
                _id={_id}
                description={description} 
                picture={picture} 
                privacy={privacy} 
                location={location}
                /> :
            <div>
                <div className=" flex items-center justify-between">
                    <div className='flex items-center'>
                        <Avatar alt={firstName} src={userPicture} style={{ width: '45px', height: '45px' }} />
                        <div className='pl-4'>  
                            <h3 className="text-lg font-medium">{firstName} {lastName}</h3>
                            <p className="text-gray-500">Location: {location}</p>
                            {privacy === 'public' ? <PublicIcon /> : <Diversity1Icon />}
                        </div>
                    </div>
                        {user._id === userId ?
                            <div className=''>
                                <button className="p-3" onClick={() => handleDelete()}>
                                    <DeleteIcon fontSize='large' />
                                </button>
                                <button className='p-3' onClick={() => setIsEditing((prev) => !prev)}>
                                    <EditIcon  fontSize='large'/>
                                </button>
                            </div> : 
                            !user.friends.some(friend => friend._id === userId) &&
                                <button onClick={() => handleAddFriend()}>
                                    <PersonAdd fontSize='large' />
                                </button>
                        }
                        
                    
                </div>
                <div className="post-content mt-4">
                    <p>{description}</p>
                    {picture !== "" ? <img className="post-picture mt-4" src={picture} alt="Post" /> :null}
                </div>
                <div className="post-footer justify-between mt-4">
                    <button className={`${paleta.colorText}`} onClick={() => handleLike()}>
                        {likes[user._id] ? 
                            <div className='flex flex-row items-center'>
                                <ThumbUpAltIcon fontSize='large' />
                                <p className='pl-2'>{likeCount}</p>
                            </div> : 
                            <div className='flex flex-row items-center'>
                                <ThumbUpOffAltIcon fontSize='large' />
                                <p className='pl-2'>{likeCount}</p>
                            </div>}
                    </button>
                    <div className="comments items-center">
                        <div className="text-gray-500">Comments:</div>
                        <div className='flex flex-col'>
                            {comments.map((comment) => {
                                return (
                                    <div className="comment flex items-center pb-2">
                                        <Avatar alt={comment.firstName} src={comment.userPicture} style={{ width: '35px', height: '35px' }} />
                                        <p className='pl-2'>{comment.firstName}</p>
                                        <p className='pl-2'>{comment.comment}</p>
                                    </div>
                                )
                            })}
                            <div className="flex">
                                <input type="text" placeholder='Comment:' value={comment} onChange={(e) => handleChange(e)} className={`${paleta.third} ${paleta.text} rounded-xl w-full mr-4 p-4 focus:outline-none`} />
                                <button onClick={() => handleComment()} className={`${paleta.colorText}`}>
                                    <SendIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> }
        </div>
    )
}

export default Post