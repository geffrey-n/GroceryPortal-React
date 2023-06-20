//Importing react from react library
import React from "react";
//Importing the header file from header.js
import Header from "./Header";

/**
 *Function to render the header component
 * @export {HomePage} Exporting the HomePage file
 * @return {*} Returns the rendering of header component
 */
export default function HomePage() {
  return (
    <div>
      <Header />
    </div>
  );
}
