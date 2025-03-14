// Importing necessary React hooks and components
import React, { useEffect, useState } from 'react';
import { Card, FormField, Loader } from '../components';

// RenderCards component is responsible for rendering the cards or a title if no posts are available
const RenderCards = ({ data, title }) => {
  // If there is data, map through each post and display a Card component for each
  if (data?.length > 0) {
    return (
// {...post} is called the spread operator. It takes all the properties (or keys) of the post object and 
// passes them as individual props to the Card component.<Card {...post} /> It is equivalent to: <Card title="Card 1" description="Card 1 description" image="image-url.jpg" />. This spreads all the key-value pairs from the post object as separate props for the Card component.
      data.map((post) => <Card key={post._id} {...post} />) // Each post is passed as props to the Card component
    );
  }

  // If no data, return a message with the given title
  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

// Home component that contains the main logic for fetching posts, handling search, and displaying the UI
const Home = () => {
  // State hooks for loading, posts, search text, and search results
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);


  // useEffect hook to fetch posts when the component is mounted
  useEffect(() => {
    fetchPosts(); // Fetch posts when the component is loaded
  }, []); // Empty dependency array means it only runs once after the first render



  // Function to fetch posts from the API
  const fetchPosts = async () => {
    setLoading(true); // Set loading to true while fetching

    try {
      // Fetch data from the API
      const response = await fetch('https://piyush-visionaryai.onrender.com/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // If the response is successful, store the posts in state
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse()); // Reverse the order of posts
      }
    } catch (err) {
      alert(err); // Handle any errors that occur
    } finally {
      setLoading(false); // Set loading to false once the fetch is complete
    }
  };


  // setTimeout: Delays a function once.
  // clearTimeout: Cancels a delayed function (it won't run).
  // setInterval: Repeats a function at regular intervals.
  // clearInterval: Stops the repeating function.
  // Function to handle changes in the search input field
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout); // Clear the previous timeout to prevent multiple calls
    setSearchText(e.target.value); // Update the search text state

    // Set a new timeout to filter results after 500ms of inactivity
    setSearchTimeout(
      setTimeout(() => {
        // Filter posts based on the search text (case-insensitive search for name or prompt)
        const searchResult = allPosts.filter((item) => 
          item.name?.toLowerCase().includes(searchText.toLowerCase()) || 
          item.prompt?.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult); // Update the search results state
      }, 500),
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">The Community Showcase</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          Browse through a collection of imaginative and visually stunning images generated by DALL-E AI
        </p>
      </div>

      <div className="mt-16">
        {/* Search input field with a custom label */}
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange} // Call handleSearchChange when the input changes
        />
      </div>

      <div className="mt-10">
        {/* Show a loading spinner while the posts are being fetched */}
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader /> {/* Display the Loader component */}
          </div>
        ) : (
          <>
            {/* If there is a search query, display the search results header */}
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Results for <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            {/* Display the posts in a grid format */}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {/* If there's a search query, display filtered results, otherwise show all posts */}
              {searchText ? (
                <RenderCards
                  data={searchedResults} // Pass the filtered search results
                  title="No Search Results Found" // Display a message if no results match
                />
              ) : (
                <RenderCards
                  data={allPosts} // Pass all the fetched posts
                  title="No Posts Yet" // Display a message if no posts are available
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
