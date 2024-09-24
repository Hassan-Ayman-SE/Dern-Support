import React, { useState, useEffect } from "react";
import img2 from "../../assets/banner/2.jpeg";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "../../CSS/Hero.css";

function Hero() {
  const img = [img2];
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: false,
    dotsClass: "slick-dots custom-dots",
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    appendDots: (dots) => (
      <div className="dots-container">
        <ul>{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {isSmallScreen ? (
        <div className="relative w-full h-full">
          <img
            src={img1}
            className="w-full h-full object-cover"
            alt="Static Image"
          />
        </div>
      ) : (
        <Slider {...settings}>
          {img.map((image, index) => (
            <div key={index} className="relative w-full h-full">
              <img
                src={image}
                className="w-full h-full object-cover"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </Slider>
      )}

      <div className="absolute inset-0 bg-customDarkGray opacity-50 z-10"></div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-customWhite p-4 z-20">
        <div className=" ">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
            Welcome to Dern Support
          </h1>

        </div>
      </div>
    </div>
  );
}

export default Hero;
