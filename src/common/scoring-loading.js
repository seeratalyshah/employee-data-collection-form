import React from "react";

const ScoringLoading = () => {
  return (
    <div role="status" className="animate-pulse py-5 w-full">
      <div className="h-10 bg-gray-200 rounded mb-4 w-full"></div>
      <div className="h-10 bg-gray-200 rounded mb-2.5 w-full"></div>
      <div className="h-10 bg-gray-200 rounded mb-2.5 w-full"></div>
      <div className="h-10 bg-gray-200 rounded mb-2.5 w-full"></div>
      <div className="h-10 bg-gray-200 rounded mb-2.5 w-full"></div>
      <div className="h-10 bg-gray-200 rounded w-full"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default ScoringLoading;
