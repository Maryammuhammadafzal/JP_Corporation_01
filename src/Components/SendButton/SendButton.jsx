import { FaLocationArrow } from "react-icons/fa";

const SendButton = () => {
  return (
    <button
      className="group relative overflow-hidden bg-orange-600 text-white hover:pr-12 px-6 py-3 rounded-2xl flex items-center gap-2 transition-all duration-200 hover:bg-orange-500"
    >
      <span className="z-10">Send</span>

      {/* Arrow Icon */}
      <span
        className="absolute right-4 opacity-0 translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200"
      >
        <FaLocationArrow size={18} />
      </span>
    </button>
  );
};

export default SendButton;