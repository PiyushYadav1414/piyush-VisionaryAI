import mongoose from 'mongoose'; // Import mongoose for database interaction

// The connectDB function takes the MongoDB URL as an argument to establish a connection
const connectDB = (url) => {
  // Configure mongoose to use the strictQuery mode for queries
  mongoose.set('strictQuery', true);

  // Connect to MongoDB using the provided URL
  mongoose.connect(url)
    .then(() => {
      // Once connected, log a success message to the console
      console.log('connected to mongo');
    })
    .catch((err) => {
      // If the connection fails, log an error message and the error itself
      console.error('failed to connect with mongo');
      console.error(err);
    });
};

// Export the connectDB function so it can be used in other parts of the application
export default connectDB;
