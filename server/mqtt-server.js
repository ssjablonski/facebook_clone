import mqtt from 'mqtt';
import { config } from 'dotenv';

config();
const { MQTT_ADRESS } = process.env;

export const sendNotification = () => {
  try {
    const friendAddTopic = 'notifications/friend';
    const mqttClient = mqtt.connect(MQTT_ADRESS);

    mqttClient.publish(friendAddTopic, 'New friend added', (err) => {
      if (err) {
        console.log('Error publishing to MQTT broker');
      } 
      mqttClient.end();
    });
  } catch (error) {
    console.log(error)
  }
}

export const hello = () => {
  try {
    const topic = 'notifications/hello';
    const mqttClient = mqtt.connect(MQTT_ADRESS);

    mqttClient.publish(topic, "Witaj na stronie")
  } catch (error) {
    console.log(error)
  }
}

export const edit = () => {
  try {
    const editTopic = 'notifications/edit';
    const mqttClient = mqtt.connect(MQTT_ADRESS);

    mqttClient.publish(editTopic, 'Profile info edited', (err) => {
      if (err) {
        console.log('Error publishing to MQTT broker');
      } 
      mqttClient.end();
    });
  } catch (error) {
    console.log(error)
  }
}
