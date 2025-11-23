import { Request, Response } from 'express';
import Post from '../models/Post';
import { AuthRequest } from '../middleware/auth';

export const createPost = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, budget, location, habits, contactLink, genderTarget } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Wajib upload foto kamar!' });
    }

    if (!req.user) {
      return res.status(401).json({ message: 'User tidak dikenali' });
    }

    let parsedHabits;
    try {
        parsedHabits = JSON.parse(habits);
    } catch (error) {
        parsedHabits = { smoking: false, cleanliness: 'Standard', sleepSchedule: 'Normal' };
    }

    const newPost = new Post({
      user: req.user.id,
      title,
      description,
      budget,
      location,
      genderTarget,
      image: `/uploads/${req.file.filename}`,
      habits: parsedHabits,
      contactLink
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: 'Gagal membuat iklan', error });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('user', 'username email'); 
      
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'username email');
    if (!post) {
      return res.status(404).json({ message: 'Iklan tidak ditemukan' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};