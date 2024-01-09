import React from 'react'
import { useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar';

function ProfilePanel() {
    const user = useSelector((state) => state.auth.user);
    return (
        <div className= "flex flex-col border border-black text-black rounded-xl w-1/5">
            {/* <img src="" alt="profile" /> */}
            <Avatar alt={user.firstName} src="../public/assets/twitter.png" />
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Location: {user.location}</p>
            <p>Occupation: {user.occupation}</p>
        </div>
    )
}

export default ProfilePanel