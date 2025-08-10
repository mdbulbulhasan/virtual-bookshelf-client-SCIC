import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/AnimationLoading/Animation-Loading.json";

const LoadingSpinner = () => {
  return (
    <motion.div
      className="flex items-center justify-center min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-48 h-48"
      >
        <Lottie animationData={loadingAnimation} loop={true} />
      </motion.div>
    </motion.div>
  );
};

export default LoadingSpinner;
