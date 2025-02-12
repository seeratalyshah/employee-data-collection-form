import React, { useEffect, useState } from "react";
import { SlOptions } from "react-icons/sl";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "src/components/auth/AuthContext";

const CustomTabs = ({ tabItems, search, resetOnAreaChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabIndex = searchParams.get("tabIndex");
  const [activeTab, setActiveTab] = useState(tabIndex ? parseInt(tabIndex) : 0);
  const [showDropdown, setShowDropdown] = useState(false);
  const { HasResource, HasPermission } = useAuth();

  useEffect(() => {
    if (resetOnAreaChange && search?.area !== undefined) {
      setActiveTab(0);
    }
  }, [search?.area, resetOnAreaChange]);

  const handleClick = (index) => {
    setActiveTab(index);
    // Remove tabIndex from URL
    // searchParams.delete("tabIndex");
    // setSearchParams(searchParams);
    // Update the URL with the new tabIndex
    searchParams.set("tabIndex", index?.toString());
    setSearchParams(searchParams);
  };

  return (
    <>
      {/* Tabs for larger screens */}
      <div className="hidden lg:flex border-b-2 border-gray-200 bg-gray-50 py-2 rounded">
        {tabItems?.map((item, index) => {
          if (![item.resource].some((resource) => HasResource(resource))) {
            return null;
          }
          return (
            <button
              key={item.id}
              className={`${
                index === activeTab
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-black"
              } py-2 px-4 font-semibold focus:outline-none text-[13px]`}
              onClick={() => handleClick(index)}
            >
              {item?.title}
            </button>
          );
        })}
      </div>

      {/* Dropdown for smaller screens */}
      <div className="relative lg:hidden flex justify-between items-center">
        <button
          className="text-black py-2 px-4 rounded-t-lg flex items-center focus:outline-none"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <p className="text-blue-500">{tabItems[activeTab].title}</p>
          {!showDropdown && (
            <SlOptions className="h-5 w-5 ml-1 text-gray-500" />
          )}
        </button>
        {/* Dropdown menu */}
        {showDropdown && (
          <div className="absolute top-9 left-4 bg-white z-10 text-black-500 border border-gray-200 w-[200px] rounded-lg shadow-lg">
            {tabItems?.map((item, index) => (
              <button
                key={index}
                className={`${
                  index === activeTab
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-black"
                } py-1 px-4 focus:outline-none w-full text-sm hover:text-blue-500`}
                onClick={() => {
                  handleClick(index);
                  setShowDropdown(false);
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Render tab content */}
      {tabItems.map((item, index) => {
        if (
          HasPermission(item.resource, "listing") ||
          HasPermission(item.resource, "full_access")
        ) {
          return index === activeTab ? (
            <div className="mt-4" key={item.id}>
              {item.content}
            </div>
          ) : null;
        }
        return null;
      })}
    </>
  );
};

export default CustomTabs;
