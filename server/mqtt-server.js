import mqtt from 'mqtt';
import { config } from 'dotenv';

config();
const { MQTT_ADRESS } = process.env;
export const mqttClient = mqtt.connect(MQTT_ADRESS);

mqttClient.on('connect', () => {
  console.log('connected to MQTT broker');
  client.subscribe('friendAdded');
});

mqttClient.on('message', (topic, message) => {
  if (topic === 'friendAdded') {
    console.log('New friend added: ' + message.toString());
  }
});