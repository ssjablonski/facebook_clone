import React, { useContext } from 'react'
import Form from 'components/Form'
import { ThemeContext } from 'context/ThemeContext';

function LoginPage() {
    const { paleta } = useContext(ThemeContext);

    return (
    <div className={`${paleta.background} ${paleta.text} h-screen`}>
        <h2 className='p-4'>Welcome to ...</h2>
        <Form />
    </div>
    
    )
}

export default LoginPage