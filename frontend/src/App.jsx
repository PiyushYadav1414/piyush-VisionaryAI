// Importing React library and necessary components from 'react-router-dom' for routing
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

// Importing assets and pages
import { logo } from './assets'; // Importing the logo image
import { Home, CreatePost } from './page'; // Importing two components/pages: Home and CreatePost

// Main App component
const App = () => (
  // BrowserRouter is used to enable routing in the app
  <BrowserRouter>
    {/* Header section */}
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      {/* Link to navigate to the home page */}
      <Link to="/">
        {/* Displaying the logo */}
        <div className='first'>
        <img src={logo} alt="logo" className="w-40 object-contain" />
        </div>
      </Link>

      {/* Link to navigate to the "Create Post" page */}
      <Link
        to="/create-post"
        className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
      >
        Create
      </Link>
    </header>

    {/* Main content area */}
    <main
      className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]"
    >
      {/* Routes define the different paths and the components to display for each */}
      <Routes>
        {/* Route for the home page - displays the Home component */}
        <Route path="/" element={<Home />} />

        {/* Route for the "Create Post" page - displays the CreatePost component */}
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
);

// Exporting the App component so it can be used in other files
export default App;
