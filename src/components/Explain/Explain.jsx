import React from "react";

const Explain = ({ id, title, text, image }) => {
  return (
    <div className="container mx-auto my-8">
      <div
        className={`pt-28 relative flex flex-col justify-center items-center rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105`}
        style={{ background: "linear-gradient(135deg, #1F316F 0%, #48CFCB 100%)" }}
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-40">
          <svg width="100%" height="100%">
            <circle cx="25%" cy="25%" r="50%" fill="rgba(255, 255, 255, 0.2)" />
          </svg>
        </div>

        {/* Image Section */}
        <div className="w-full max-w-md h-48 lg:h-64">
          <img
            src={image}
            alt="Service Visual"
            className="w-full h-full object-cover rounded-t-lg shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="w-full max-w-md p-6 text-center lg:text-left bg-customLightGray lg:bg-transparent lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-customCyan mb-4">
            {title}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed tracking-wide text-customWhite mb-4">
            {text}
          </p>
          <button
            className="px-4 py-2 bg-customTeal text-white font-semibold rounded-full shadow-md hover:bg-customCyan transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explain;
