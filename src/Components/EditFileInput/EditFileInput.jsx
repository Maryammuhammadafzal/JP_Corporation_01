import React, { useState } from "react";
import { Link } from "react-router-dom";
import Downloads from "../Downloads/Downloads";

export const EditFileInput = ({ label, id, fileRef, onChange, existingFile, name }) => {
  
  return(
  <div className="imageInput max-sm:text-xs text-sm rounded-md w-full h-auto">
    <div className="flex flex-col gap-2">
      {label}
      <label htmlFor={id} className="w-full h-auto flex">
        {/* Custom Button */}
        <button
          type="button"
          className="bg-neutral-300 border-neutral-500 border border-r-0 hover:bg-neutral-400 w-[120px] p-3 max-sm:p-2 rounded-bl-lg rounded-tl-lg shadow-md transition duration-300"
        >
          Upload File
        </button>

        {/* File Input */}
        <input
          type="file"
          name={name}
          id={id}
          onChange={onChange}
          className="border-neutral-500 border rounded-br-lg p-3 max-sm:p-2 rounded-tr-lg w-[90%]"
        />
      </label>
    </div>
    {existingFile && (
      <div className="existingFile w-full max-sm:text-xs h-auto p-2 text-sm">
        <p>
          Existing {label} File:{" "}
          <Link to={`/${existingFile}`} target="_blank" rel="noopener noreferrer">
            View
          </Link>
        </p>
      </div>
    )}
  </div>
)}