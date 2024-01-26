import React, { useContext } from 'react'
import mqtt from 'mqtt'
import { NotificationsContext } from 'context/NotificationsContext'
import { ThemeContext } from 'context/ThemeContext'
import DeleteIcon from '@mui/icons-material/Delete';

function Notifications() {
    const {messages, setMessages } = useContext(NotificationsContext)
    const {paleta} = useContext(ThemeContext)

    
    return (
        <div className={`absolute z-10 w-1/5 ${paleta.primary} rounded-xl shadow-md overflow-hidden m-3 p-4 top-20 right-0`}>
            {messages.length > 0 ? (
                <ol className="space-y-4">
                    <button className={`rounded-xl ${paleta.color} text-black p-3 m-1`} onClick={() => setMessages([])}>
                        <DeleteIcon />
                    </button>
                    {messages.map((msg, index) => (
                        <li key={index} className={`flex items-center p-4 rounded-xl ${paleta.background} ${paleta.colorText} `}>
                            <span className="font-medium">{msg}</span>
                        </li>
                    ))}
                </ol>
            ) : (
                <p>No messages</p>
            )}
        </div>
    )
}

export default Notifications