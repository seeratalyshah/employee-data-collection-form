import React from "react";
import logo from "../../images/logo.png";

const Header = () => {
  return (
    <div className="h-[120px] flex items-center justify-center gap-4 w-full shadow-lg fixed top-0 z-10 bg-white">
      <div className="h-[80px] w-[80px]">
      <img src={logo} alt="logo"  className="w-full h-full"/>
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="font-semibold text-lg">Employee Data Collection Form</h1>
        <p className="text-center text-slate-600">
          For all Muslim Hands employees worldwide
        </p>
      </div>
    </div>
  );
};

export default Header;
