import React from 'react'
 

const EditInputFeild = ({ label, id, type = "text", value, onChange, placeholder, required , active = false}) => (
       
       <div className="flex flex-col w-full gap-2 h-auto">
          <label htmlFor={id} className="w-full gap-3 flex flex-col justify-center items-start">
            <p>
              {label} {required && <sup className="text-orange-700">*</sup>}
            </p>
            <input
              type={type}
              id={id}
              value={value}
              onChange={onChange}
              className={`border-neutral-500 border w-full rounded-md p-3 max-sm:text-xs max-sm:p-2 ${active && "border-orange-400"}`}
              placeholder={placeholder}
            />
          </label>
        </div>
      );
      

export default EditInputFeild;
