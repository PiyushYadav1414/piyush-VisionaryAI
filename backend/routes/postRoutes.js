// Importing required dependencies
import express from 'express'; // Framework for building REST APIs
import * as dotenv from 'dotenv'; // For loading environment variables from .env file
import { v2 as cloudinary } from 'cloudinary'; // Cloudinary SDK for handling image uploads

import Post from '../models/post.js'; // Mongoose model for interacting with the 'Post' collection

// Configure dotenv to load environment variables
dotenv.config();

// Create an Express router instance
const router = express.Router();

// Configuring Cloudinary with credentials from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Cloudinary account's cloud name
  api_key: process.env.CLOUDINARY_API_KEY,       // Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Cloudinary API secret
});

// Route to fetch all posts (GET /api/v1/post)
router.get('/', async (req, res) => {
  try {
    // Retrieve all posts from the MongoDB collection
    const posts = await Post.find({});

    // Send the posts back to the client
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    // Handle any errors that occur
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

// Route to create a new post (POST /api/v1/post)
router.post('/', async (req, res) => {
  try {
    const { name, prompt, photo } = req.body; // Extract the name, prompt, and photo from the request body

    // Upload the photo to Cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo);

    // Create a new post in the MongoDB collection
    const newPost = new Post({
      name,                   // Name of the user
      prompt,               // Text prompt used for generating the image
      photo: photoUrl.url,  // URL of the uploaded photo from Cloudinary
    });
    

    // Send the newly created post back to the client
    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    // Handle any errors that occur
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});

// Export the router to be used in the main server file
export default router;
