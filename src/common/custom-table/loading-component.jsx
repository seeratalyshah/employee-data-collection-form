import React from "react";

const LoadingSkelton = () => {
  return (
    <div role="status" className="max-w-100 animate-pulse">
      <div className="h-11 bg-gray-200 rounded-lg mx-5  mb-4 mt-4"></div>
      <div className="h-11 bg-gray-200 rounded-lg mx-5  mb-4"></div>
      <div className="h-11 bg-gray-200 rounded-lg mx-5 mb-4"></div>
      <div className="h-11 bg-gray-200 rounded-lg mx-5  mb-4"></div>
      <div className="h-11 bg-gray-200 rounded-lg mx-5  mb-4"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSkelton;
