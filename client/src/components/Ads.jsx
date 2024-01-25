import { ThemeContext } from 'context/ThemeContext'
import React, { useContext, useEffect, useState } from 'react'

function Ads() {
    const [ad, setAd] = useState('');
    const { paleta } = useContext(ThemeContext);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:3001/ads/stream');

        eventSource.onmessage = function(event) {
            const message = JSON.parse(event.data);
            setAd(message);
        }

        return () => {
            eventSource.close();
        }
    }, []);

    return (
        <div className={`${paleta.primary} ${paleta.text} rounded-xl p-4 ml-2 mb-2 `}>
            <p>{ad.title}</p>
            <p>{ad.description}</p>
        </div>
    )
}

export default Ads