import React from "react";

const EditSelectFeild = ({ label, id, options, value, onChange, required }) => (
  <div className="flex flex-col w-full gap-2 h-auto">
    <label htmlFor={id} className="w-full">
      <p>
        {label} {required && <sup className="text-orange-700">*</sup>}
      </p>
      <select
        id={id}
        className="appearance-none mt-2 w-full border-neutral-500 border rounded-md p-2 outline-0 text-gray-400"
        value={value}
        onChange={onChange}
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            className="text-neutral-800 bg-white p-2"
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default EditSelectFeild;
