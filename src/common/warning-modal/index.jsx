import React, { useState } from "react";
import PropTypes from "prop-types";
import { IoIosWarning } from "react-icons/io";

function WarningPrompt({
  modalOpenProps,
  acceptButtonProps,
  modelOpenLabel,
  acceptButtonLabel,
  heading,
  subTitle,
  disabled = false,
  color = "#FF0000", // Default to red
}) {
  const [modal, setModal] = useState(false);

  // Function to handle accept button click
  const handleAccept = () => {
    acceptButtonProps.onClick(); // Call the onClick function passed from props
    setModal(false); // Close the modal after handling the click
  };

  return (
    <div>
      <div onClick={() => setModal(true)} {...modalOpenProps}>
        {modelOpenLabel}
      </div>
      {modal && (
        // Adjusting z-index to ensure the modal appears on top
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-80 md:w-96 xl:w-1/4 mx-auto bg-white rounded-xl shadow-lg z-60">
            <div className="flex justify-end p-2">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setModal(false)}
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
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-2">
                <IoIosWarning
                  style={{ fontSize: "55px", color: color }} // Use color for the icon
                />
                <div className="mb-6 text-start">
                  <h4 className="text-xl font-semibold text-gray-800">
                    {heading}
                  </h4>
                  <p className="text-gray-600 font-medium text-md mt-1">
                    {subTitle}
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mb-2 mt-4">
                <button
                  onClick={() => setModal(false)}
                  className="px-4 py-2 text-sm text-gray-600 rounded bg-gray-200 hover:bg-gray-300 focus:outline-none font-medium"
                >
                  Cancel
                </button>
                <button
                  disabled={disabled}
                  onClick={handleAccept} // Call handleAccept for accept button click
                  className="flex items-center px-4 py-2 text-sm text-white rounded hover:bg-opacity-90 focus:outline-none font-medium"
                  style={{ backgroundColor: color }} // Use color for the button background
                >
                  {acceptButtonLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

WarningPrompt.propTypes = {
  modalOpenProps: PropTypes.object,
  acceptButtonProps: PropTypes.object,
  acceptButtonLabel: PropTypes.string,
  heading: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  color: PropTypes.string, // Color prop for icon and button
  modelOpenLabel: PropTypes.node.isRequired,
};

WarningPrompt.defaultProps = {
  modalOpenProps: {},
  acceptButtonProps: {},
  acceptButtonLabel: "Accept",
  color: "#FF0000", // Default color is red
};

export default WarningPrompt;
