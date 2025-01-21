// Importing mongoose to define a schema and model for MongoDB
import mongoose from 'mongoose';

// Defining the Post schema with fields in one line
const Post = new mongoose.Schema({
  name: { type: String, required: true, }, // Name of the person who created the post
  prompt: { type: String, required: true }, // Text prompt used to generate the image
  photo: { type: String, required: true }, // Base64 string or URL of the generated image
});

// Creating and exporting the Post model
const PostSchema = mongoose.model('Post', Post);
export default PostSchema;
