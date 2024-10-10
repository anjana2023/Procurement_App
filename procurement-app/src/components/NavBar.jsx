import React from "react";
import { Link } from "react-router-dom"; 

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-9 px-8"> 
      <div className="flex justify-between items-center">
        <div className="text-3xl font-extrabold text-sky-700 tracking-wide">
          ProcureSmart
        </div>
        <div className="space-x-6">
          
          <Link to="/item-master" className="text-sky-600 hover:text-blue-600 font-semibold  text-xl"> 
            Item Master
          </Link>
          <Link to="/purchase-order" className="text-sky-600 hover:text-blue-600 font-semibold  text-xl"> 
          Purchase Order
          </Link>
         
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
