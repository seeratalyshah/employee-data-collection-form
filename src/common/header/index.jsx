import React from "react";

const Header = () => {
  return (
    <div className="h-24 w-full flex flex-col justify-center items-center shadow-lg fixed top-0 z-10 bg-white">
      <h1 className="font-semibold text-lg">
        Employee Data Collection Form
      </h1>
      <p className="text-center text-slate-600">
      For all Muslim Hands employees worldwide
      </p>
    </div>
  );
};

export default Header;
