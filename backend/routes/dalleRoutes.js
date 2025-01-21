import express from 'express'; // Framework for building REST APIs
import * as dotenv from 'dotenv'; // Loads environment variables from a .env file
import { OpenAI } from 'openai'; // Correct OpenAI import for v4
import cloudinary from 'cloudinary'; // For image upload (you need to install this)
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

// Define a GET route for the base URL of this router
router.get('/', (req, res) => {
  // Sends a simple JSON response as a confirmation
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

// Define a POST route for generating images with DALL-E and saving to MongoDB
router.post('/', async (req, res) => {
  try {
    const { name, prompt } = req.body; // Extract 'name' and 'prompt' from the request body

    // Call OpenAI API to generate an image
    const image = await openai.images.generate({
      prompt,               // Text prompt input describing the image to generate
      n: 1,                 // Number of images to generate (1 in this case)
      size: '1024x1024',    // Dimensions of the generated image
    });

    // Extract the generated image URL from the response
    const imageUrl = image.data[0].url;
    // console.log("Image url by openai:",imageUrl);
    // Upload the image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(imageUrl, { 
      folder: "generated_images"
    });
    // console.log("Image url by cloudinary:",cloudinaryResponse.url);

    // Create a new post in the MongoDB collection
    const newPost = new Post({
      name,                   // Name of the user
      prompt,                 // Text prompt used for generating the image
      photo: cloudinaryResponse.url,  // URL of the uploaded photo from Cloudinary
    });

    // Save the new post to MongoDB
    await newPost.save();

    // Send the generated image URL and confirmation response back to the client
    res.status(200).json({ photo: cloudinaryResponse.url });
  } catch (error) {
    // Log the error and send an error response to the client
    console.error(error);
    res.status(500).send(
      error?.response?.data?.error?.message || 'Something went wrong'
    );
  }
});

// Export the router to be used in the main server file
export default router;
