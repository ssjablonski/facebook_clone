import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import { Avatar } from '@mui/material';
import { setPosts } from 'reducer';
import { RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';
import { addPost } from 'reducer';
import { create } from '@mui/material/styles/createTransitions';



function CreatePost({info}) {
    const [render, setRender] = info
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [post, setPost] = useState('');
    const [picture, setPicture] = useState('');
    const [privacy, setPrivacy] = useState('public');
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);


    async function handlePost() {
        const createPost = await fetch(`http://localhost:3001/posts/create`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user._id,
                description: post,
                picturePath: picture,
                privacy: privacy,
            }),
        });
        const createPostRes = await createPost.json();
        console.log("create", createPostRes)
        dispatch(setPosts(createPostRes))
        setRender(true)
        setPost('');
        setPicture('');

    }

    function handleChange(event) {
        setPrivacy(event.target.value);
    }

    return (
        <div className='flex flex-col justify-center mb-2 bg-white p-4 rounded-xl'>
            <div className='flex'>
                <div className='mr-4 flex justify-center items-center'>
                    <Avatar src={user.picturePath}/>
                </div>
                <TextareaAutosize
                    className="resize-none p-4 w-full focus:outline-none rounded-xl bg-blue-300"
                    minRows={2}
                    placeholder={`Co masz na myśli ${user.firstName}?`}
                    onChange={(e) => setPost(e.target.value)} 
                    value={post}
                />
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={privacy}
                    onChange={handleChange}
                    defaultValue="public"
                >
                <FormControlLabel value="private" control={<Radio />} label="Private" />
                <FormControlLabel value="public" control={<Radio />} label="Public" />
                </RadioGroup>
            </div>
            <div className='flex justify-center space-x-96 p-8 '>
                <button>
                    <ImageIcon />   
                </button>
                <button onClick={
                    () => {
                        handlePost()
                    }
                }>
                    <SendIcon />
                </button>
            </div>                
            
        </div>
    )
}

export default CreatePost


