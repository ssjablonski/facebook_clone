import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin } from 'reducer'
import Dropzone from 'react-dropzone'


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

    async function login(values, onSubmitProps) {
        const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        });
        const loggedIn = await loggedInResponse.json();

        onSubmitProps.resetForm();
        console.log(loggedIn.user)
        // console.log(loggedInResponse.status)
        if (loggedInResponse.status === 200) {
            dispatch(
                setLogin({
                user: loggedIn.user,
                token: loggedIn.token,
                })
            );
            console.log('log')
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
            console.log('yes')
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
                        <input className='p-3 rounded-3xl bg-slate-800 mb-3' type="text" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Email" />
                        {formik.touched.email && formik.errors.email ? <div className='login-form-error'>{formik.errors.email}</div> : null}
                        <input className='p-3 rounded-3xl bg-slate-800 mb-3' type="password" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Password" />
                        {formik.touched.password && formik.errors.password ? <div className='login-form-error'>{formik.errors.password}</div> : null}

                    </>
                ) : (
                    <>
                        <input className='p-3 rounded-3xl bg-slate-800 mb-3' type="text" id="firstName" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="First Name" />
                        {formik.touched.firstName && formik.errors.firstName ? <div className='text-red-600'>{formik.errors.firstName}</div> : null}
                        <input className='p-3 rounded-3xl bg-slate-800 mb-3' type="text" id="lastName" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Last Name" />
                        {formik.touched.lastName && formik.errors.lastName ? <div className='text-red-600'>{formik.errors.lastName}</div> : null}
                        <input className='p-3 rounded-3xl bg-slate-800 mb-3' type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Email" />
                        {formik.touched.email && formik.errors.email ? <div className='text-red-600'>{formik.errors.email}</div> : null}
                        <input className='p-3 rounded-3xl bg-slate-800 mb-3' type="password" id="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Password" />
                        {formik.touched.password && formik.errors.password ? <div className='text-red-600'>{formik.errors.password}</div> : null}
                        <input className='p-3 rounded-3xl bg-slate-800 mb-3' type="password" id="confirmPassword" name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Confirm Password" />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className='text-red-600'>{formik.errors.confirmPassword}</div> : null}
                        <input className='p-3 rounded-3xl bg-slate-800 mb-3' type="text" id="location" name="location" value={formik.values.location} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Location" />
                        {formik.touched.location && formik.errors.location ? <div className='text-red-600'>{formik.errors.location}</div> : null}
                        <input className='p-3 rounded-3xl bg-slate-800 mb-3' type="text" id="occupation" name="occupation" value={formik.values.occupation} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Occupation" />
                        {formik.touched.occupation && formik.errors.occupation ? <div className='text-red-600'>{formik.errors.occupation}</div> : null}
                    </>
                )}
                <button type="submit" id='submit' className='rounded-3xl bg-black text-white p-3 mb-2'>Submit</button>
                <button type="button" id="changeForm" className='rounded-3xl bg-black text-white p-3 mb-2' onClick={handleChange}>
                    {pageType === 'login' ? "Don't have an account? Register!" : "Already have an account? Login!"}
                </button>
            </form>
        </div>
    )
}

export default Form