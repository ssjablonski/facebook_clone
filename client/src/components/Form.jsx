import React, { useContext } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin } from 'reducer'
import Dropzone from 'react-dropzone'
import TextField from '@mui/material/TextField';
import { ThemeContext } from 'context/ThemeContext'


const registerValidation = Yup.object().shape({
    firstName: Yup.string()
        .required('Required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required(),
    lastName: Yup.string()
        .required('Required')
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
    email: Yup.string()
        .required('Required')
        .email('Invalid email'),
    password: Yup.string().required('Required').min(8, 'Too Short!'),
    confirmPassword: Yup.string()
        .required('Required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    location: Yup.string().required('Required'),
    occupation: Yup.string().required('Required'),
    })
    
const loginValidation = Yup.object().shape({
    email: Yup.string()
        .required('Required')
        .email('Invalid email'),
    password: Yup.string().required('Requirted').min(8, 'Too Short!'),
})

const registerInitValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const loginInitValues = {
    email: '',
    password: '',
}

function Form() {
    const [pageType, setPageType] = React.useState('login')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { mode, setMode, paleta } = useContext(ThemeContext);

    async function login(values, onSubmitProps) {
        const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        });
        const loggedIn = await loggedInResponse.json();

        onSubmitProps.resetForm();
        if (loggedInResponse.status === 200) {
            dispatch(
                setLogin({
                user: loggedIn.user,
                token: loggedIn.token,
                })
            );
            navigate("/home");
        }
        
    }

    async function register(values, onSubmitProps) {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        
        const registerResponse = await fetch("http://localhost:3001/auth/register", {
            method: "POST",
            body: formData,
        });
        const register = await registerResponse.json();
        onSubmitProps.resetForm();

        if (registerResponse.status === 201) {
            setPageType("login");
        }

    }

    const formik = useFormik({
        initialValues: pageType === 'login' ? loginInitValues : registerInitValues,
        validationSchema: pageType === 'login' ? loginValidation : registerValidation,
        onSubmit: handleSubmit,
        
    })


    function handleChange() {
        setPageType(pageType === 'login' ? 'register' : 'login')
        formik.resetForm();
    }

    async function handleSubmit(values, onSubmitProps) {
        if (pageType === 'login') {
            await login(values, onSubmitProps);
        } else {
            await register(values, onSubmitProps);
        }
    };    

    return(
        <div className="flex justify-center content-center">
            <form onSubmit={formik.handleSubmit} className='flex flex-col'>
                {pageType === 'login' ? (
                    <>
                        <TextField
                            required
                            size="normal"
                            error={formik.errors.email ? true : false}
                            helperText={formik.errors.email ? formik.errors.email : null}
                            variant="outlined"
                            label="Email"
                            type="text"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            margin="dense"
                            // className='pb-2 text-red-600 rounded-xl mb-4'
                        />
                        <TextField
                            required
                            size="normal"
                            error={formik.errors.password ? true : false}
                            helperText={formik.errors.password ? formik.errors.password : null}
                            variant="outlined"
                            label="Password"
                            type="password"
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            margin="dense"
                            className='pb-2 text-black rounded-xl m-2'
                        />

                    </>
                ) : (
                    <>
                        <TextField
                            required
                            size="large" 
                            error={formik.errors.firstName ? true : false} 
                            helperText={formik.errors.firstName ? formik.errors.firstName : null}
                            variant="outlined" 
                            label="First Name" 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            value={formik.values.firstName} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            margin="dense"
                            className='pb-2 text-black rounded-xl m-2'
                        />
                        <TextField
                            required
                            size="large"
                            error={formik.errors.lastName ? true : false}
                            helperText={formik.errors.lastName ? formik.errors.lastName : null}
                            variant="outlined"
                            label="Last Name"
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            margin="dense"
                            className='pb-2 text-black rounded-xl m-2'
                        />
                        <TextField
                            required
                            size="large" 
                            error={formik.errors.email ? true : false} 
                            helperText={formik.errors.email ? formik.errors.email : null}
                            variant="outlined" 
                            label="Email" 
                            type="text" 
                            id="email" 
                            name="email" 
                            value={formik.values.email} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            margin="dense"
                            className='pb-2 text-black rounded-xl m-2'
                            
                        />
                        <TextField
                            required
                            size="large" 
                            error={formik.errors.password ? true : false} 
                            helperText={formik.errors.password ? formik.errors.password : null}
                            variant="outlined" 
                            label="Password" 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={formik.values.password} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            margin="dense"
                            className='pb-2 text-black rounded-xl m-2'
                        />
                        <TextField
                            required
                            size="large" 
                            error={formik.errors.confirmPassword ? true : false} 
                            helperText={formik.errors.confirmPassword ? formik.errors.confirmPassword : null}
                            variant="outlined" 
                            label="Confirm Password" 
                            type="password" 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            value={formik.values.confirmPassword} 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            margin="dense"
                            className='pb-2 text-black rounded-xl m-2'
                        />
                        <TextField
                            required
                            size="large"
                            error={formik.errors.location ? true : false}
                            helperText={formik.errors.location ? formik.errors.location : null}
                            variant="outlined"
                            label="Location"
                            type="text"
                            id="location"
                            name="location"
                            value={formik.values.location}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            margin="dense"
                            className='pb-2 text-black rounded-xl m-2'
                        />
                        <TextField
                            required
                            size="large"
                            error={formik.errors.occupation ? true : false}
                            helperText={formik.errors.occupation ? formik.errors.occupation : null}
                            variant="outlined"
                            label="Occupation"
                            type="text"
                            id="occupation"
                            name="occupation"
                            value={formik.values.occupation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            margin="dense"
                            className='pb-2 text-white rounded-xl m-2'
                        />
                            
                        
                    </>
                )}
                <button type="submit" id='submit' className={`rounded-3xl ${paleta.color} text-black p-3 mb-2`}>Submit</button>
                <button type="button" id="changeForm" className={`rounded-3xl ${paleta.color} text-black p-3 mb-2`} onClick={handleChange}>
                    {pageType === 'login' ? "Don't have an account? Register!" : "Already have an account? Login!"}
                </button>
            </form>
        </div>
    )
}

export default Form