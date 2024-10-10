import React from "react";
import { Link } from "react-router-dom";
import HomeImage from "../assets/bgimage.webp";
import { motion } from "framer-motion";
import Navbar from "../components/NavBar";

const Home = () => {
  return (
    <div className="home-container min-h-screen bg-gray-100">
      <div className="fixed top-0 w-full z-50">
        <Navbar />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-16 p-10 mt-14 lg:p-24">
        <motion.div
          className="lg:w-3/4 w-full mb-10 lg:mb-0"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={HomeImage}
            alt="Procurement software hero section"
            className="header-image w-full lg:w-[1200px] h-auto rounded-lg shadow-2xl"
          />
        </motion.div>

        <motion.div
          className="home-content lg:w-1/2 w-full text-center lg:text-left space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug">
            Empowering Your Business With
            <span className="text-blue-600"> Smart Procurement</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
            We provide a host of support services to make your e-procurement
            software company’s processes smoother, strengthening your supply
            chain teams with smart, efficient solutions.
          </p>

          <motion.div
            className="buttons-container space-x-6 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Link
              to="/item-master"
              className="btn bg-blue-600 text-white py-3 px-6 text-lg rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg"
            >
              Item Master
            </Link>
            <Link
              to="/purchase-order"
              className="btn bg-green-600 text-white py-3 px-6 text-lg rounded-lg hover:bg-green-700 transition duration-300 shadow-lg"
            >
              Purchase Order
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
