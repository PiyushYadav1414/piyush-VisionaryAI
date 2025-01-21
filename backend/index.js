// Importing necessary dependencies
import express from 'express'; // Importing Express, a Node.js framework for building APIs
import * as dotenv from 'dotenv'; // Importing dotenv to handle environment variables
import cors from 'cors'; // Importing CORS to enable cross-origin resource sharing

import connectDB from './mongodb/connect.js'; // Importing the MongoDB connection function
import postRoutes from './routes/postRoutes.js'; // Importing the routes for handling posts
import dalleRoutes from './routes/dalleRoutes.js'; // Importing the routes for handling DALL-E related requests

// Configuring dotenv to load environmen t variables from a .env file
dotenv.config();

// Creating an Express app instance
const app = express();
const PORT = 8080;
// Using CORS middleware to enable requests from other origins
app.use(cors());

// Using JSON middleware to parse incoming JSON requests with a size limit of 50mb
app.use(express.json({ limit: '50mb' }));

// Defining routes for the API
app.use('/api/v1/post', postRoutes); // All requests starting with /api/v1/post will be handled by postRoutes
app.use('/api/v1/dalle', dalleRoutes); // All requests starting with /api/v1/dalle will be handled by dalleRoutes

// Root route that returns a simple welcome message
app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!', // Sending a JSON response with a message
  });
});

// Function to start the server
const startServer = async () => {
  try {
    // Connecting to the database using the MongoDB URL from environment variables before listening to port 8080
    await connectDB(process.env.MONGODB_URL);  

    // Starting the server on port 8080
    app.listen(PORT, () =>  console.log(`Server is listening at http://localhost:${PORT}`));
  } catch (error) {
    console.log(error); // Logging any errors that occur during startup
  }
};

// Calling the startServer function to start the server
startServer();
