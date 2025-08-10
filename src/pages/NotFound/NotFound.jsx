// src/pages/NotFound/NotFound.jsx
import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen text-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1
        className="text-6xl font-bold text-red-500 mb-4"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <p className="text-2xl font-semibold mb-2">Oops! Page not found</p>
      <p className="mb-6 text-gray-600">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Go to Home
        </button>
      </Link>
    </motion.div>
  );
};

export default NotFound;
