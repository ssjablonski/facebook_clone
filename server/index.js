import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import postsRoutes from './routes/posts.js';
import adsRoutes from './routes/ads.js';

import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';
import User from './models/User.js';
import Post from './models/Post.js';

// /import { startChatServer } from './chatServer.js';
import mqtt from 'mqtt';
import { config } from 'dotenv';

config();
const { MQTT_ADRESS } = process.env;
const mqttClient = mqtt.connect(MQTT_ADRESS);

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());


app.post('/auth/register',  register);
app.post('/posts', verifyToken,  createPost);

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/posts', postsRoutes)
app.use('/ads', adsRoutes);

// ! request ktory ustawia mode dark/light strony w ciasteczku
// app.post('/set-theme', (req, res) => {
//   const theme = req.body.theme; // theme should be either 'light' or 'dark'
//   res.cookie('theme', theme, { maxAge: 900000, httpOnly: true });
//   res.send({ message: 'Theme set successfully' });
// });

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL).then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))).catch((error) => console.log(error.message));

// startChatServer();  





