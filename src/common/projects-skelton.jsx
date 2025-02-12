import React from "react";

const ProjectSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 mb-4">
      {[...Array(10)].map((_, index) => (
        <div
          className="border border-silver-600 rounded-lg shadow-sm p-6"
          key={index}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <div className="bg-gray-200 rounded w-48 h-6 mb-3"></div>
              <div className="bg-gray-200 rounded w-full h-20 mb-3"></div>
            </div>
            <div className="flex lg:flex-row lg:gap-4 md:flex-col md:gap-1 sm:flex-col sm:gap-1 xs:flex-col xs:gap-1 gap-4">
              <div className="bg-gray-200 rounded w-48 h-6 mb-3"></div>
              <div className="bg-gray-200 rounded w-48 h-6 mb-3"></div>
            </div>
          </div>
          <div className="border border-b mt-3" />
          <div className="py-3 flex gap-3 flex-col items-start md:items-center md:flex-row">
            <div className="bg-green-200 rounded w-10 h-10"></div>
            <div className="bg-pink-200 rounded w-10 h-10"></div>
            <div className="bg-blue-200 rounded w-10 h-10"></div>
            <div className="bg-lime-200 rounded w-10 h-10"></div>
            <div className="bg-red-200 rounded w-10 h-10"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectSkeleton;
