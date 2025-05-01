import React from "react";

const AdminButton = ({text , onClick}) => {
  return (
    <button
      className="bg-orange-400 text-white px-4 max-sm:text-sm max-sm:px-3 py-2 rounded-lg cursor-pointer"
      onClick={onClick} >
      {text}
    </button>
  );
};

export default AdminButton;
