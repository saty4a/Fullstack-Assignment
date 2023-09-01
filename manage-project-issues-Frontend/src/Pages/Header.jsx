import React from "react";
import { FaPlus, FaXmark } from "react-icons/fa6";

const Header = ({showData, setShowData}) => {
  return (
    <div className="flex justify-between mx-5 my-3">
      <h1 className="fw-light">Add a Issue</h1>
      <div className="cursor-pointer" onClick={() => {setShowData(!showData)}}>
        {showData ? <FaXmark /> :<FaPlus /> }
      </div>
    </div>
  );
};

export default Header;
