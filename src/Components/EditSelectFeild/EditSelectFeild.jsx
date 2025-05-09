import React from "react";

const EditSelectFeild = React.forwardRef(
  ({ label, id, options, defaultValue, onChange, required } , ref) => (
  <div className="flex flex-col w-full gap-2 h-auto">
    <label htmlFor={id} className="w-full">
      <p>
        {label} {required && <sup className="text-orange-700">*</sup>}
      </p>
      <select
        id={id}
        className="appearance-none mt-2 w-full border-neutral-500 border rounded-md p-2 outline-0 text-gray-400"
        ref={ref}
        defaultValue={defaultValue}
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
)
);
export default EditSelectFeild;
