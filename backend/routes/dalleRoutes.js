import express from 'express'; // Framework for building REST APIs
import * as dotenv from 'dotenv'; // Loads environment variables from a .env file
import { OpenAI } from 'openai'; // OpenAI API import for image generation
import cloudinary from 'cloudinary'; // Cloudinary image upload
import Post from '../models/post.js'; // Assuming you have a Post model defined

// Configure dotenv to load environment variables
dotenv.config();

// Create an instance of the Express router
const router = express.Router();

// Set up OpenAI configuration with the API key from the environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // API key for accessing OpenAI's services
});

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define a GET route for the base URL of this router (optional, for testing)
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

// Define a POST route for generating images with DALL-E and uploading to Cloudinary
router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body; // Extract 'name' and 'prompt' from the request body

    // Call OpenAI API to generate an image
    const image = await openai.images.generate({
      prompt,               // Text prompt input describing the image to generate
      n: 1,                 // Number of images to generate (1 in this case)
      size: '1024x1024',    // Dimensions of the generated image
    });

    // Extract the generated image URL from the OpenAI response
    const imageUrl = image.data[0].url;
    console.log("Image URL from OpenAI:", imageUrl);

    // Upload the generated image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(imageUrl, { 
      folder: "generated_images"
    });
    console.log("Image URL from Cloudinary:", cloudinaryResponse.secure_url);

    // Send the generated image URL back to the frontend
    res.status(200).json({ photo: cloudinaryResponse.secure_url });
  } catch (error) {
    console.error(error);
    res.status(500).send(
      error?.response?.data?.error?.message || 'Something went wrong'
    );
  }
});

export default router;
