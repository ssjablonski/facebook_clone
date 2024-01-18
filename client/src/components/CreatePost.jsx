import React, { useContext, useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import { Avatar } from '@mui/material';
import { setPosts } from 'reducer';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material'; 
import { ThemeContext } from 'context/ThemeContext';
import LocationOnIcon from '@mui/icons-material/LocationOn';




function CreatePost({info}) {
    const { setRender, paleta} = useContext(ThemeContext)
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [img, setImg] = useState(false)

    const formik = useFormik({
        initialValues: {
            post: "",
            picture: "",
            privacy: "public",
            location: '',
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
        onSubmit: handlePost,
    })

    async function handlePost(values, onSubmitProps) {
        const createPost = await fetch(`http://localhost:3001/posts/create`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user._id,
                description: values.post,
                picture: values.picture,
                privacy: values.privacy,
                location: values.location || user.location
            }),
        });
        const createPostRes = await createPost.json();
        dispatch(setPosts(createPostRes))
        setRender(true)
        onSubmitProps.resetForm();

    }

    return (
        <div className={`flex flex-col justify-center mb-2 ${paleta.primary} ${paleta.text} p-4 rounded-xl`}>
            <form onSubmit={formik.handleSubmit}>
                <div className='flex flex-col'>
                    <div className={`flex pb-6 ${paleta.colorText}`}>
                        <LocationOnIcon fontSize='large' style={{ margin: 7}} />
                        <input type="text" name='location' id='location' placeholder='Location' value={formik.values.location} onChange={formik.handleChange} className={`${paleta.third} ${paleta.text} rounded-xl w-full ml-2 mr-4 p-4 focus:outline-none`} />

                    </div>
                    <div className='mr-4 flex justify-center items-center'>
                        <div className="mr-4">
                            <Avatar src={user.picture} alt={user.firstName} style={{ width: '45px', height: '45px' }}/>
                        </div>
                        <TextareaAutosize
                        id='post'
                        name='post'
                        value={formik.values.post}
                        onChange={formik.handleChange}
                        className={`resize-none p-4 w-full focus:outline-none rounded-xl ${paleta.third} ${paleta.text}`}
                        minRows={2}
                        placeholder={`Co masz na myśli ${user.firstName}?`}
                        />
                    </div>
                    {img ? <input type="text" name='picture' id='picture' placeholder='Image URL' value={formik.values.picture} onChange={formik.handleChange} className={`${paleta.third} ${paleta.text} rounded-xl ml-14 mr-4 my-4 p-4 focus:outline-none`} /> : null}

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
                    <button type='button' onClick={() => setImg(!img)}>
                        <ImageIcon fontSize='large' />   
                    </button>
                    <button type="submit" id='submit'>
                        <SendIcon fontSize='large' />
                    </button>
                </div>                
            </form>
        </div>
    )
}

export default CreatePost


