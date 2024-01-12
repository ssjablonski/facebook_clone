import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import { Avatar } from '@mui/material';
import { setPost, setPosts } from 'reducer';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material'; 
import { ThemeContext } from 'context/ThemeContext';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function PostForm({ setIsEditing, handleDelete, _id, description, picturePath, privacy, location}) {
    const { paleta } = useContext(ThemeContext);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const { render, setRender} = useContext(ThemeContext)

    const formik = useFormik({
        initialValues: {
            post: description,
            picture: picturePath,
            privacy: privacy,
            location: location,
        },
        validationSchema: Yup.object().shape({
            post: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required(),
            picture: Yup.string(),
            privacy: Yup.string().oneOf(['public', 'private']).required(),
            location: Yup.string(),
            }),
        onSubmit: handleEdit,
    })

    async function handleEdit(values, onSubmitProps) {
        console.log("val", values)
        console.log(_id)
        const editPost = await fetch(`http://localhost:3001/posts/${_id}/update`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description: values.post,
                picturePath: values.picture,
                privacy: values.privacy,
                location: values.location
            }),
        });
        const editPostRes = await editPost.json();
        setIsEditing(false)
        dispatch(setPost({ post: editPostRes }))
        setRender(true)

    }

    return (
        <form onSubmit={formik.handleSubmit}>
                <div className='flex items-center justify-between'>
                    <div className="flex items-center">
                        <Avatar alt={user.firstName} src={user.picture} />
                        <div className=''>  
                            <h3 className="text-lg font-medium w-full ml-2 mr-4 p-2">{user.firstName} {user.lastName}</h3>
                            <input type="text" name='location' id='location' placeholder='New location' value={formik.values.location} onChange={formik.handleChange} className={`${paleta.third} ${paleta.text} rounded-xl w-full focus:outline-none ml-4 mb-4 p-2`} />
                        </div>
                    </div>
                    <div className='flex'>
                        <button className="p-3" >
                            <DeleteIcon fontSize='large' onClick={() => handleDelete()}/>
                        </button>
                        <button className='p-3' onClick={() => setIsEditing((prev) => !prev)} >
                            <EditIcon  fontSize='large'/>
                        </button>
                    </div> 
                </div>
                <div className='mr-4 flex items-center'>
                        <TextareaAutosize
                        id='post'
                        name='post'
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        className={`resize-none p-4 w-4/5 focus:outline-none rounded-xl ${paleta.third} ${paleta.text}`}
                        minRows={2}
                        placeholder={`Update your status`}
                    />
                </div>
                <div className={`flex w-full justify-between p-8 ${paleta.colorText} px-40`}>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="privacy"
                        value={formik.values.privacy}
                        onChange={formik.handleChange}
                        defaultValue="public"
                        className='text-white'
                    >
                    <FormControlLabel value="private" control={<Radio style={{ color: '#14FFEC' }}/>} label="Private" />
                    <FormControlLabel value="public" control={<Radio style={{ color: '#14FFEC' }}/>} label="Public" />
                    </RadioGroup>
                    <button>
                        <ImageIcon fontSize='large' />   
                    </button>
                    <button type="submit" id='submit'>
                        <SendIcon fontSize='large' />
                    </button>
                </div>                
            </form>
    )
}

export default PostForm