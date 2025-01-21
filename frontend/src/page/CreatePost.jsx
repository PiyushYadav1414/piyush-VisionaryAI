import React, { useState } from 'react'; // React and useState for state management
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate for navigation between pages

// Importing assets, utility functions, and components
import { preview } from '../assets'; // Placeholder image for preview
import { getRandomPrompt } from '../utils'; // Utility function to generate a random prompt
import { FormField, Loader } from '../components'; // FormField and Loader components for form input and loading spinner

// Main CreatePost component
const CreatePost = () => {
  const navigate = useNavigate(); // For navigating to other pages (e.g., redirecting after sharing the post)

  // State to manage form data (name, prompt, and photo URL)
  const [form, setForm] = useState({
    name: '', // User's name
    prompt: '', // The prompt for generating the image
    photo: '', // The generated image
  });

  // State to manage loading indicators
  const [generatingImg, setGeneratingImg] = useState(false); // To show a spinner while the image is being generated
  const [loading, setLoading] = useState(false); // To show a spinner while the post is being shared

  // Function to handle changes in form inputs
  const handleChange = (e) => 
    setForm({ ...form, [e.target.name]: e.target.value }); // Update the specific field (name or prompt) in the form state

  // Function to set a random prompt for the user
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt); // Get a random prompt from the utility/index.js function
    setForm({ ...form, prompt: randomPrompt }); // Update the prompt field in the form state
  };

  
  useEffect(() => {
    console.log("Updated Form from generateImage:", form);
  }, [form]);

  

  // Function to generate the image based on the prompt
  const generateImage = async () => {
    if (form.prompt) { // Ensure a prompt is provided
      try {
        setGeneratingImg(true); // Start the loading spinner
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({prompt: form.prompt }), // Send the prompt to the API
        });

        const data = await response.json(); // Get the generated image data
        console.log(data);
        // Directly use Cloudinary URL without Base64 conversion
        setForm(prevForm => ({ ...prevForm, photo: data.photo }));
        console.log("Generated Image URL:", data.photo);
      } catch (err) {
        alert(err); // Show an error if something goes wrong
      } finally {
        setGeneratingImg(false); // Stop the loading spinner
      }
    } else {
      alert('Please provide a proper prompt'); // Alert the user if no prompt is provided
    }
  };

  // Function to handle form submission (sharing the post)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (form.prompt && form.photo) { // Ensure both prompt and photo are provided
      setLoading(true); // Start the loading spinner
      try {
        console.log("Form from handleSubmit",form);
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }), // Send the form data (name, prompt, photo) to the API
        });

        await response.json(); // Wait for the response
        alert('Success'); // Show a success message
        navigate('/'); // Redirect to the home page
      } catch (err) {
        alert(err); // Show an error if something goes wrong
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    } else {
      alert('Please generate an image with proper details'); // Alert the user if required fields are missing
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Generate an imaginative image through DALL-E AI and share it with the community
        </p>
      </div>

      {/* Form for creating a post */}
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          {/* Input field for user's name */}
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., Piyush Yadav"
            value={form.name}
            handleChange={handleChange}
          />

          {/* Input field for the prompt */}
          <FormField
            labelName="Prompt"  
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          {/* Image preview */}
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              /> 
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        {/* Button to generate the image */}
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {/* Button to share the post */}
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Once you have created the image you want, you can share it with others in the community **
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
