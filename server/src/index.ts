import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { upload } from './middleware/upload';
import { login, register } from './controllers/authController';
import { verifyToken } from './middleware/auth';
import {createPost, getPosts, getPostById, updatePost, deletePost} from './controllers/postController';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

mongoose.connect('mongodb://localhost:27017/Sekamar')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log(err));


app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

app.get('/api/posts', getPosts);
app.get('/api/posts/:id', getPostById);
app.post('/api/posts', verifyToken, upload.single('image'), createPost);
app.put('/api/posts/:id', verifyToken, upload.single('image'), updatePost);
app.delete('/api/posts/:id', verifyToken, deletePost);

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));