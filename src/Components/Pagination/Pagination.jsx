import React from 'react'

const Pagination = ({ currentPage, totalPages, goToPage, goToPreviousPage, goToNextPage }) => {
  return (
        <div className="w-auto flex justify-end flex-wrap h-auto">
        <button
          className={`px-2 py-2 mx-1 text-2xl max-md:text-xl rounded text-neutral-400 font-bold ${
            currentPage === 1 && "disabled cursor-not-allowed"
          }`}
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>

        {/* Condensed Page Numbers */}
        {totalPages <= 5 ? (
          [...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`px-4 py-2 mx-1 max-md:mx-[2px] max-md:text-md max-md:px-3 max-sm:px-2 max-md:py-1 rounded ${
                currentPage === index + 1
                  ? "bg-orange-400 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => goToPage(index + 1)}
            >
              {index + 1}
            </button>
          ))
        ) : (
          <>
            {/* Always show first page */}
            <button
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === 1
                  ? "bg-orange-400 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => goToPage(1)}
            >
              1
            </button>

            {/* Show left ellipsis if needed */}
            {currentPage > 3 && <span className="px-2">...</span>}

            {/* Show middle pages */}
            {[currentPage - 1, currentPage, currentPage + 1]
              .filter((page) => page > 1 && page < totalPages)
              .map((page) => (
                <button
                  key={page}
                  className={`px-4 py-2 mx-1 rounded ${
                    currentPage === page
                      ? "bg-orange-400 text-white"
                      : "bg-gray-300"
                  }`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ))}

            {/* Show right ellipsis if needed */}
            {currentPage < totalPages - 2 && (
              <span className="px-2">...</span>
            )}

            {/* Always show last page */}
            <button
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === totalPages
                  ? "bg-orange-400 text-white"
                  : "bg-gray-300"
              }`}
              onClick={() => goToPage(totalPages)}
            >
              {totalPages}
            </button>
          </>
        )}

        <button
          className={`px-4 py-2 mx-1 font-bold text-2xl max-md:text-xl text-neutral-400 rounded ${
            currentPage === totalPages && "disabled cursor-not-allowed"
          }`}
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>
  )
}

export default Pagination
