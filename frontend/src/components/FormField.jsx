// Importing React library
import React from 'react';


// Defining the FormField componentProps:
// labelName: The label text displayed above the input field.
//  type,              The input type (e.g., text, email, password)
//  name,              The name attribute for the input field
//  placeholder,       Placeholder text for the input field
//  value,             The current value of the input field
//  handleChange,      Function to handle changes in the input field
//  isSurpriseMe,      Boolean to determine if the "Surprise Me" button should be displayed
//  handleSurpriseMe,  Function to handle the "Surprise Me" button click
const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => (

    <div> 
        {/* Label and optional "Surprise Me" button */}
        <div className="flex items-center gap-2 mb-2">

            
{/* Below is label of input field. In React, for is a reserved word in JavaScript(for loop) as we use JSX, so 
we can't use it as an attribute name in JSX. Instead, React uses htmlFor to avoid conflicts with JavaScript's 
for keyword. The value of htmlFor should match the id of the input field. When this happens, clicking on the label will focus on the associated input field (which is good for accessibility).*/}
            <label htmlFor={name} className="block text-sm font-medium text-gray-900" >
                {labelName} {/* Display the label text */}
            </label>

            {/* If isSurpriseMe is true, render the "Surprise Me" button */}
            {isSurpriseMe && (
                <button type="button" onClick={handleSurpriseMe} className="font-semibold text-xs bg-[#EcECF1] py-1 px-2 rounded-[5px] text-black" >
                    Surprise me {/* Text displayed on the button */}
                </button>
            )}
        </div>

        {/* Input field fro above label */}
        <input type={type} id={name} name={name} placeholder={placeholder} value={value} onChange={handleChange} required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3" />

    </div>
);

// Exporting the FormField component so it can be used in other parts of the app
export default FormField;
