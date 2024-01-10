import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import Dropzone from 'react-dropzone'
import TextField from '@mui/material/TextField';
import { updateUser } from 'reducer'


Yup.object().shape({
    firstName: Yup.string()
        .required('Required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required(),
    lastName: Yup.string()
        .required('Required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    location: Yup.string().required('Required'),
    occupation: Yup.string().required('Required'),
    picturePath: Yup.string().required('Required'),
    })

function UpdateForm({info}) {
    const [render, setRender] = info;
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            location: '',
            occupation: '',
            picturePath: '',
        },
        validationSchema: Yup.object().shape({
            firstName: Yup.string()
                
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required(),
            lastName: Yup.string()
                
                .min(2, 'Too Short!')
                .max(50, 'Too Long!'),
            location: Yup.string(),
            occupation: Yup.string(),
            picturePath: Yup.string(),
            }),
        onSubmit: handleSubmit,
        
    })

    async function handleSubmit(values, onSubmitProps) {
        const updateUserRes = await fetch(`http://localhost:3001/user/${user._id}/update`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
        const updateUserJson = await updateUserRes.json()
        dispatch(
            updateUser(updateUserJson)
        );
        onSubmitProps.resetForm()
    };    

    return(
        <div className="flex justify-center content-center">
            <form onSubmit={formik.handleSubmit} className='flex flex-col'>
                    
                        <TextField 
                            error={formik.errors.firstName ? true : false} 
                            helperText={formik.errors.firstName ? formik.errors.firstName : null}
                            variant="standard" 
                            label="First Name" 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            value={formik.values.firstName} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            
                            margin='dense'
                        />
                        <TextField
                            error={formik.errors.lastName ? true : false}
                            helperText={formik.errors.lastName ? formik.errors.lastName : null}
                            variant="standard"
                            label="Last Name"
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            
                            margin='dense'
                        />
                        <TextField
                            error={formik.errors.location ? true : false}
                            helperText={formik.errors.location ? formik.errors.location : null}
                            variant="standard"
                            label="Location"
                            type="text"
                            id="location"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            
                            margin='dense'
                        />
                        <TextField
                            error={formik.errors.occupation ? true : false}
                            helperText={formik.errors.occupation ? formik.errors.occupation : null}
                            variant="standard"
                            label="Occupation"
                            type="text"
                            id="occupation"
                            name="occupation"
                            value={formik.values.occupation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            
                            margin='dense'
                        />
                        <TextField
                            error={formik.errors.picturePath ? true : false}
                            helperText={formik.errors.picturePath ? formik.errors.picturePath : null}
                            variant="standard"
                            label="Picture Path"
                            type="text"
                            id="picturePath"
                            name="picturePath"
                            value={formik.values.picturePath}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            
                            margin='dense'
                        />

{/*                         
                        <input className='p-3 rounded-3xl bg-slate-800 mb-3' type="text" id="occupation" name="occupation" value={formik.values.occupation} onChange={formik.handleChange} onBlur={formik.handleBlur}
                        
                        margin='dense' placeholder="Occupation" />
                        {formik.touched.occupation && formik.errors.occupation ? <div className='text-red-600'>{formik.errors.occupation}</div> : null} */}
            
                <button type="submit" id='submit' className='rounded-3xl bg-black text-white p-3 mb-2'>Submit</button>
            </form>
        </div>
    )
}

export default UpdateForm