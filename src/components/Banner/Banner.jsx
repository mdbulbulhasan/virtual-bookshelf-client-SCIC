import React, { useState, useEffect } from "react";
import slide1 from "../../assets/sliderImg/slide-1.jpg";
import slide2 from "../../assets/sliderImg/slide-2.jpg";
import slide3 from "../../assets/sliderImg/slide-3.jpg";
import slide4 from "../../assets/sliderImg/slide-4.jpg";

const Banner = () => {
  const slides = [slide1, slide2, slide3, slide4];
  const [current, setCurrent] = useState(0);

  // Automatic slide change every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Handle click on different halves of the image
  const handleClick = (e) => {
    const clickX = e.nativeEvent.offsetX;
    const width = e.target.clientWidth;

    if (clickX < width / 2) {
      prevSlide(); // clicked on left half
    } else {
      nextSlide(); // clicked on right half
    }
  };

  return (
    <div className="relative w-full h-60 md:h-[400px] lg:h-[700px] overflow-hidden">
      <img
        src={slides[current]}
        alt={`Slide ${current + 1}`}
        className="w-full h-full object-cover transition-all duration-500 cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};

export default Banner;
