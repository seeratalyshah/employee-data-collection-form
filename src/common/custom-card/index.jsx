import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";
import { BsFillEyeFill } from "react-icons/bs";

const Card = ({
  title,
  children,
  extras,
  collapsible = false,
  onClick,
  buttonTitle,
  disabled = false,
  newClick,
  newButtonTitle,
  newDisabled,
  view = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="">
      <div className="p-4 rounded-t-md bg-blue-100 shadow">
        <div className="flex justify-between items-start md:items-center flex-col md:flex-row ">
          <h3 className="font-semibold text-md px-4 text-blue-600">{title}</h3>
          <div className="flex items-center">
            {view && (
              <div className="flex justify-start md:justify-end mr-3">
                <button
                  disabled={newDisabled}
                  type="button"
                  className="rounded hover:text-blue-500 text-sm flex items-center gap-1 mt-3 md:mt-0"
                  onClick={newClick}
                >
                  <span>
                    <BsFillEyeFill size="21px" className="text-blue-500" />
                  </span>
                  {newButtonTitle}
                </button>
              </div>
            )}

            {extras && (
              <div className="flex justify-start md:justify-end">
                <button
                  disabled={disabled}
                  type="button"
                  className="rounded hover:text-blue-500 text-sm flex items-center gap-1 mt-3 md:mt-0"
                  onClick={onClick}
                >
                  <span>
                    <IoAddCircleSharp size="21px" className="text-blue-500" />
                  </span>
                  {buttonTitle}
                </button>
              </div>
            )}

            {collapsible && (
              <button onClick={handleCollapse} className="ml-2">
                {isCollapsed ? (
                  <IoIosArrowDown size={24} className="text-gray-500" />
                ) : (
                  <IoIosArrowUp size={24} className="text-gray-500" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      {!isCollapsed && (
        <div className="text-gray-700 text-base shadow p-3 px-6 rounded-b-md">
          {children}
        </div>
      )}
    </div>
  );
};

export default Card;
