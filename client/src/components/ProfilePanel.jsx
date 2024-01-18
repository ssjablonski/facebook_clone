import React,{useContext, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import { ThemeContext } from 'context/ThemeContext';
import EditIcon from '@mui/icons-material/Edit';
import UpdateForm from './UpdateForm';
import DeleteIcon from '@mui/icons-material/Delete';
import { setLogout } from 'reducer';

function ProfilePanel() {
    const [edit, setEdit] = useState(false);
    const { render, setRender} = useContext(ThemeContext)
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const {paleta} = useContext(ThemeContext);

    async function deleteAccount(id) {
            const deleteUserRes = await fetch(`http://localhost:3001/user/${id}/delete`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
            }})
            if (deleteUserRes.status === 200) {
                dispatch(setLogout());
            }
        }
    
    return (
        <div className={`flex flex-col ${paleta.primary} ${paleta.text} text-black rounded-xl mr-2 p-4`}>
            <div className={`flex justify-between ${paleta.colorText}`}>
                <Avatar alt={user.firstName} src={user.picture} style={{ width: '45px', height: '45px' }}/>
                    <div>
                        <button className='mr-2' onClick={
                            () => setEdit(!edit)
                        }>
                            <EditIcon fontSize="large" />
                        </button>
                        <button onClick={
                            () => deleteAccount(user._id)

                        }>
                            <DeleteIcon fontSize="large" />
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