import React, { createContext, useEffect, useState } from 'react';
import mqtt from 'mqtt';

const NotificationsContext = createContext();

function NotificationsProvider({ children }) {    
    // const MQTT_ADRESS = 'ws://localhost:8000/mqtt'
    const MQTT_ADRESS = 'ws://127.0.0.1:8000/mqtt'

    const topic = 'notifications/friend'
    const topic2 = 'notifications/hello'
    const topic3 = 'notifications/edit'
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const mqttClient = mqtt.connect(MQTT_ADRESS)
        mqttClient.on('connect', () => {
            console.log('connected')
            mqttClient.subscribe(topic, (err) => {
            if (!err) {
                console.log(`Subscribed to ${topic}`);
            } else {
                console.error(`Failed to subscribe to ${topic}: ${err}`);
            }
            })
            mqttClient.subscribe(topic2, (err) => {
                if (!err) {
                    console.log(`Subscribed to ${topic2}`);
                } else {
                    console.error(`Failed to subscribe to ${topic2}: ${err}`);
                }
            })
            mqttClient.subscribe(topic3, (err) => {
                if (!err) {
                    console.log(`Subscribed to ${topic3}`);
                } else {
                    console.error(`Failed to subscribe to ${topic3}: ${err}`);
                }
            })
        })

        
        

        const handle = (topic, message) => {
            if (topic === 'notifications/friend') {
                console.log(message.toString())
                setMessages(prevMessages => [...prevMessages, message.toString()])
            } else if (topic === 'notifications/hello'){
                console.log(message.toString())
                setMessages(prevMessages => [...prevMessages, message.toString()])
            } else if (topic === 'notifications/edit'){
                console.log(message.toString())
                setMessages(prevMessages => [...prevMessages, message.toString()])
            } else if (topic === 'notifications/post') {
                console.log(message.toString())
                setMessages(prevMessages => [...prevMessages, message.toString()])
            }
        } 

        mqttClient.on("message", handle)
        

        return () => {
            mqttClient.end()
        }
    }, [])
    
    return (
        <NotificationsContext.Provider value={{ messages, setMessages }}>
            {children}
        </NotificationsContext.Provider>
    );
}

export { NotificationsContext, NotificationsProvider };