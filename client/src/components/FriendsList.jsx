import { Avatar } from '@mui/material';
import { ThemeContext } from 'context/ThemeContext'
import React, { useContext, useEffect } from 'react'
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

    useEffect(() => {   
        getUserFriends();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {   
        if (render) {
            getUserFriends();
            setRender(false);
        }
    }, [render]) // eslint-disable-line react-hooks/exhaustive-deps


    async function deleteFriend(friendId) {
        console.log("friendId", friendId)
        console.log("user._id", user._id)
        const deleteFriendFetch = await fetch(`http://localhost:3001/user/${user._id}/${friendId}/remove`, 
        {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log("deleteFriendFetch", deleteFriendFetch)
        const data = await deleteFriendFetch.json();
        console.log("data", data)
        dispatch(setFriends({ friends: data }))
        setRender(true)
    }
    
    return (
        <div>
            {friends.map((friend) => (
                <div className={`${paleta.primary} ${paleta.text} rounded-xl p-4 m-2 w-full`}>
                    <div className="flex justify-between">
                        <div className="flex">
                            <Avatar alt={friend.firstName} src={friend.picturePath} />
                            <div className="flex flex-col ml-2">
                                <span className="text-lg font-bold">{friend.firstName} {friend.lastName}</span>
                                <span className="text-sm text-gray-500">{friend.location}</span>
                            </div>
                        </div>
                        <div className="flex">
                            <button className={`${paleta.color} text-black font-bold rounded-full p-2`}>
                                Message
                            </button>
                            <button className="bg-gray-500 hover:bg-gray-700 text-black font-bold p-2 rounded-full ml-2" onClick={() => deleteFriend(friend._id)}>
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