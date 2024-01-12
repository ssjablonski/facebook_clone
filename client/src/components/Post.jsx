import React, { useContext } from 'react'
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deletePost } from 'reducer';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PublicIcon from '@mui/icons-material/Public';
import { PersonAdd } from '@mui/icons-material';
import { ThemeContext } from 'context/ThemeContext';




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
        privacy,
    } = info;
    const [render, setRender] = how
    const likeCount = Object.keys(likes).length;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token)
    const { mode, setMode, paleta } = useContext(ThemeContext);

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

    function handleAddFriend() {
        console.log("add friend")
    }

    function handleEdit() {
        console.log("edit")
    }
    
    return (
        <div className={`${paleta.primary} ${paleta.text} shadow-md rounded-md p-4 mb-2`}>
            <div className=" flex items-center justify-between">
                <div className='flex items-center'>
                    <Avatar alt={firstName} src={userPicturePath} />
                    <div className='pl-4'>  
                        <h3 className="text-lg font-medium">{firstName} {lastName}</h3>
                        <p className="text-gray-500">Location: {location}</p>
                        {privacy === 'public' ? <PublicIcon /> : <Diversity1Icon />}
                    </div>
                </div>
                    {user._id === userId ?
                        <div className=''>
                            <button className="p-3" onClick={() => handleDelete()}>
                                <DeleteIcon />
                            </button>
                            <button className='p-3' onClick={() => handleEdit()}>
                                <EditIcon />
                            </button>
                        </div> :
                        <button onClick={() => handleAddFriend()}>
                            <PersonAdd />
                        </button>
                    }
                
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