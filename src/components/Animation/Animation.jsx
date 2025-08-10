import React from "react";
import { motion } from "motion/react";
import img1 from "../../assets/imgAnimation/img-1.jpg";
import img2 from "../../assets/imgAnimation/img-2.jpg";
import { Link } from "react-router";

const Animation = () => {
  return (
    <div className="hero animation-section bg-[var(--bg-color)] text-[var(--text-color)] min-h-full md:min-h-screen px-4 sm:px-6 md:px-12 py-8">
      <div className="hero-content flex flex-col-reverse lg:flex-row-reverse items-center gap-10 w-full">
        {/* Images Section */}
        <div className="flex-1 hidden md:flex flex-col items-center justify-center gap-6 w-full">
          <motion.img
            src={img1}
            animate={{ y: [100, 180, 100] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md border-orange-600 border-s-8 border-b-8 rounded-t-[40px] rounded-br-[40px] shadow-2xl"
          />
          <motion.img
            src={img2}
            animate={{ x: [100, 180, 100] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md border-orange-600 border-s-8 border-b-8 rounded-t-[40px] rounded-br-[40px] shadow-2xl"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 text-center lg:text-left w-full">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold"
          >
            Welcome to Virtual Bookshelf
          </motion.h1>
          <p className="py-4 text-base sm:text-lg text-gray-600 px-2 sm:px-0">
            Discover, collect, and manage your favorite books all in one place.
            Whether you're an avid reader or just getting started, your personal
            bookshelf awaits.
          </p>
          <Link
            to="/bookshelf"
            className="btn btn-primary hover:bg-secondary mt-2"
          >
            Explore Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Animation;
