import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import postsRoutes from './routes/posts.js';
import { register } from './controllers/auth.js';
import { createPost } from './controllers/posts.js';
import { verifyToken } from './middleware/auth.js';
import User from './models/User.js';
import Post from './models/Post.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());


app.post('/auth/register', upload.single('picture'), register); // ! to dlatego tak bo potrzebujemy upload do zapisania zdjecia
app.post('/posts', verifyToken, upload.single('picture'), createPost);

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/posts', postsRoutes)


const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL).then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))).catch((error) => console.log(error.message));







