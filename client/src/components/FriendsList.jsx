import { Avatar } from '@mui/material';
import { ThemeContext } from 'context/ThemeContext'
import React, { useContext, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'reducer';

function FriendsList() {
    const { render, setRender, paleta} = useContext(ThemeContext)
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const dispatch = useDispatch();


    async function getUserFriends() {
        const response = await fetch(
            `http://localhost:3001/user/${user._id}/friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
            );
            const data = await response.json();
            dispatch(setFriends({ friends: data }));
    };

    useLayoutEffect(() => {   
        getUserFriends();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useLayoutEffect(() => {   
        if (render) {
            getUserFriends();
            setRender(false);
        }
    }, [render]) // eslint-disable-line react-hooks/exhaustive-deps


    async function deleteFriend(friendId) {
        const deleteFriendFetch = await fetch(`http://localhost:3001/user/${user._id}/${friendId}/remove`, 
        {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = await deleteFriendFetch.json();
        dispatch(setFriends({ friends: data }))
        setRender(true)
    }
    
    return (
        <div>
            {friends.map((friend) => (
                <div className={`${paleta.primary} ${paleta.text} rounded-xl p-4 ml-2 mb-2 `}>
                    <div className="flex justify-between">
                        <div className="flex">
                            <Avatar alt={friend.firstName} src={friend.picture} style={{ width: '45px', height: '45px' }} />
                            <div className="flex flex-col ml-2">
                                <span className="text-lg font-bold">{friend.firstName} {friend.lastName}</span>
                                <span className="text-sm text-gray-500">{friend.location}</span>
                            </div>
                        </div>
                        <div className="flex">
                            <button className={`${paleta.color} text-black font-bold p-2 rounded-full ml-2`} onClick={() => deleteFriend(friend._id)}>
                                Unfriend
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FriendsList