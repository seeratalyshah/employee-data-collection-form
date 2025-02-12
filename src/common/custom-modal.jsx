import React from "react";
import PropTypes from "prop-types";

const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  customStyling,
  modalStyling,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div
        className={`relative w-80 md:w-11/12 mx-auto bg-white rounded-xl shadow-lg max-h-[90vh] ${
          modalStyling || "max-w-xl"
        }`}
      >
        <div className="sticky top-0 z-10 bg-white p-4 border-b rounded-t-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-md font-semibold text-gray-800">{title}</h3>
            <button onClick={onClose} className="text-black focus:outline-none">
              <svg
                className="w-6 h-6 text-gray-800"
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
        </div>
        <div className={`p-4 ${customStyling}`}>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  title: "Title",
  cancelText: "Cancel",
  okText: "Ok",
};

export default Modal;
