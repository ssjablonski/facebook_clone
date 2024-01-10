import React,{useContext, useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import { ThemeContext } from 'context/ThemeContext';
import EditIcon from '@mui/icons-material/Edit';
import UpdateForm from './UpdateForm';
import DeleteIcon from '@mui/icons-material/Delete';
import { Navigate, useNavigate } from 'react-router-dom';
import { setLogout } from 'reducer';

function ProfilePanel() {
    const [edit, setEdit] = useState(false);
    const [render, setRender] = useState(false);
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const {mode, setMode} = useContext(ThemeContext);

    async function deleteAccount(id) {
            const deleteUserRes = await fetch(`http://localhost:3001/user/${user._id}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
            }})
            const deleteUserJson = await deleteUserRes.json();
            if (deleteUserRes.status === 200) {
                dispatch(setLogout());
            }
            
           
        }
    
    return (
        <div className="flex flex-col border border-black bg-white text-black rounded-xl mr-2 p-4">
            <div className="flex justify-between">
                <Avatar alt={user.firstName} src="../public/assets/twitter.png" />
                    <div>
                        <button className='mr-2' onClick={
                            () => setEdit(!edit)
                        }>
                            <EditIcon />
                        </button>
                        <button onClick={
                            () => deleteAccount(user._id)

                        }>
                            <DeleteIcon />
                        </button>    
                    </div>

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