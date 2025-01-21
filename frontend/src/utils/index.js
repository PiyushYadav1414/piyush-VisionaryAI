// Importing the FileSaver library, which is used to save files on the user's computer.
import FileSaver from 'file-saver';

// Importing a list(array) of "surprise me" prompts(string) from another file, stored in a constant variable.
import { surpriseMePrompts } from '../constant';


// Function to get a random prompt from the surpriseMePrompts array.
export function getRandomPrompt(prompt) {
  // Generate a random index based on the length of the surpriseMePrompts array.
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

  // Get the random prompt from the array using the random index in order to show random image using surprize me.
  const randomPrompt = surpriseMePrompts[randomIndex];

  // If the random prompt is the same as the previous(current) prompt, call the function again 
  // to ensure a different prompt is returned.
  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  // Return the randomly selected prompt.
  return randomPrompt;
}


//  Function to download an image.
// FileSaver.saveAs is a function from the FileSaver.js library that lets you download files from the web 
// to your computer.It takes 2 arguments
//        _id - The unique identifier for the image.
//        photo - The URL or binary data of the photo to download.
export async function downloadImage(_id, photo) {
  // Use the FileSaver library to save the photo to the user's computer.
  // The file will be saved with the name "download-[id].jpg", where [id] is the value of _id.
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
