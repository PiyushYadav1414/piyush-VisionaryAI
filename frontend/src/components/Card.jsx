import React from 'react'; // Importing React for building the component

import { download } from '../assets'; // Importing the download icon asset
import { downloadImage } from '../utils'; // Importing the utility function to download the image

// Card component that displays a post's image, prompt, and other details


// It is recieving { _id, name, prompt, photo } as props from page/Home.jsx.
// {...post} is called the spread operator. It takes all the properties (or keys) of the post object and 
// passes them as individual props to the Card component.<Card {...post} /> It is equivalent to: 
// <Card title="Card 1" description="Card 1 description" image="image-url.jpg" />. This spreads all the 
// key-value pairs from the post object as separate props for the Card component.
const Card = ({ _id, name = "Anonymous", prompt, photo }) => (
  <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
    {/* The image section of the card */}
    <img
      className="w-full h-auto object-cover rounded-xl" // Image styles (cover the area, rounded corners)
      src={photo} // The image source URL
      alt={prompt} // The alt text for the image, which is the prompt
    />

    {/* The overlay section that appears when the card is hovered */}
    <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
      {/* Display the prompt text inside the overlay */}
      <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

      {/* User details and download button section */}
      <div className="mt-5 flex justify-between items-center gap-2">
        <div className="flex items-center gap-2">
          {/* Circle showing the first letter of the user's name */}
          <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
            {name[0]} {/* First letter of the user's name */}
          </div>
          {/* Display the full user's name */}
          <p className="text-white text-sm">{name}</p>
        </div>

        {/* Download button of image calls*/}
        <button 
          type="button" 
          onClick={() => downloadImage(_id, photo)} // Calls downloadImage function from utils/index.js when clicked
          className="outline-none bg-transparent border-none"
        >
          {/* Image for Download button */}
          <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
        </button>
      </div>
    </div>
  </div>
);

export default Card;
