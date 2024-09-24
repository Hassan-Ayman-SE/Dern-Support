import React from "react";

function SearchInput({ searchTerm, setSearchTerm, onSearch, placeholder }) {
  return (
    <div className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="flex items-center max-w-lg w-full mx-auto rounded-full bg-white shadow-lg">
        <div className="w-full">
          <input
            type="search"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-2 text-gray-900 bg-white border-2 border-teal-500 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <div>
          <button
            type="button"
            className={`flex items-center justify-center w-12 h-12 text-white rounded-full transition-all duration-300 ${searchTerm.length > 0
              ? "bg-teal-600 hover:bg-teal-700 hover:shadow-lg"
              : "bg-gray-400 cursor-not-allowed"
              }`}
            disabled={searchTerm.length === 0}
            onClick={onSearch}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

}

export default SearchInput;