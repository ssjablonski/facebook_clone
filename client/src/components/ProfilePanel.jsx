import React,{useContext, useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import { ThemeContext } from 'context/ThemeContext';
import EditIcon from '@mui/icons-material/Edit';
import UpdateForm from './UpdateForm';

function ProfilePanel() {
    const [edit, setEdit] = useState(false);
    const [render, setRender] = useState(false);
    const user = useSelector((state) => state.user);
    const {mode, setMode} = useContext(ThemeContext);

    
    return (
        <div className="flex flex-col border border-black bg-white text-black rounded-xl mr-2 p-4">
            <div className="flex justify-between">
                <Avatar alt={user.firstName} src="../public/assets/twitter.png" />
                <button className='mr-2' onClick={
                    () => setEdit(!edit)
                }>
                    <EditIcon />
                </button>

            </div>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Location: {user.location}</p>
            <p>Occupation: {user.occupation}</p>
            {edit ? <UpdateForm info={[render, setRender]}/> : null}
        </div>
    )
}

export default ProfilePanel