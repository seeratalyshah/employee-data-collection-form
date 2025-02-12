import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { IoIosArrowUp } from "react-icons/io";

const CustomDropDown = ({ buttonTitle, options }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const dropdownRef = useRef(null); // Ref for handling clicks outside the dropdown

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="inline-block text-left relative" ref={dropdownRef}>
      <div>
        <button
          onClick={toggleDropdown}
          type="button"
          className="bg-green-600 inline-flex justify-center items-center w-full rounded-md px-3.5 py-2.5 text-white text-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          id="options-menu"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {isOpen ? (
            <IoIosArrowUp className="mr-2.5 text-white" size="17px" />
          ) : (
            <IoIosArrowDown className="mr-2.5" size="17px" />
          )}
          {buttonTitle}
        </button>
      </div>

      {isOpen && (
        <div
          className="font-medium origin-top-right z-40 absolute right-[-120px] md:right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {options?.map((item) => {
              return (
                <NavLink
                  key={item?.id}
                  to={item?.link}
                  onClick={handleOptionClick}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                >
                  {item?.title}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropDown;
