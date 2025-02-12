import React from "react";
import errorImage from "../../../assets/error-img.png";
import { useNavigate } from "react-router-dom";

const ErrorComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={errorImage} alt="Error" className="w-1/3 h-auto" />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => {
          navigate("/overview");
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorComponent;
