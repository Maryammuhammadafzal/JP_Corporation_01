// CustomArrow.js

export const NextArrow = ({ onClick }) => (
        <button
          onClick={onClick}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 z-40 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 bg-white text-black rounded-full px-5 py-3"
        >
          ❯
        </button>
      );
      
      export const PrevArrow = ({ onClick }) => (
        <button
          onClick={onClick}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 z-40 -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 bg-white text-black rounded-full px-5 py-3"
        >
          ❮
        </button>
      );
      