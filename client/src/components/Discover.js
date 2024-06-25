import React from "react";
import { motion } from "framer-motion";
import Gradient from "../assets/Gradient.svg";
import HeroImage from "../assets/app_mockup.png";
import BlueArrow from "../assets/blue-button.svg";
import Google from "../assets/Google.svg";
import Slack from "../assets/Slack.svg";
import Trustpilot from "../assets/Trustpilot.svg";
import Cnn from "../assets/CNN.svg";
import Clutch from "../assets/Clutch.svg";
import { useSelector } from "react-redux";

const Discover = () => {
  const { skillnaavData } = useSelector((state) => state.root);

  if (
    !skillnaavData ||
    !skillnaavData.discover ||
    skillnaavData.discover.length === 0
  ) {
    return null;
  }

  const discover = skillnaavData.discover[0];
  const discovercompimg = skillnaavData.discovercompimg || [];
  const {
    discoverheading,
    discoversubheading,
    tryforfreebtn,
    viewpricebtn,
    imgUrl,
  } = discover;

  const renderCompanyImages = () => {
    if (discovercompimg.length === 0) {
      // Render default images if discovercompimg is empty
      const defaultCompanies = [
        { src: Google, alt: "Google" },
        { src: Slack, alt: "Slack" },
        { src: Trustpilot, alt: "Trustpilot" },
        { src: Cnn, alt: "CNN" },
        { src: Clutch, alt: "Clutch" },
      ];

      return (
        <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:grid-cols-5">
          {defaultCompanies.map((company, index) => (
            <motion.img
              key={index}
              src={company.src}
              alt={company.alt}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
              className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 rounded-lg"
            />
          ))}
        </div>
      );
    }

    // Render uploaded images from discovercompimg
    return (
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 px-4 sm:px-0">
        {discovercompimg.slice(0, 5).map((image, index) => (
          <motion.img
            key={image._id}
            src={image.imageUrl}
            alt={`company ${index + 1}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 + index * 0.2 }}
            className="w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 rounded-lg mx-2 my-2"
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      id="discover"
      className="pt-6 lg:pt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div>
        <motion.h1
          className="text-center text-3xl sm:text-4xl leading-[32px] font-medium text-[#172026] lg:text-5xl lg:leading-[48px]"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {discoverheading}
        </motion.h1>
        <motion.p
          className="text-center pt-4 sm:pt-6 text-base sm:text-lg font-normal text-[#36485C] lg:text-lg lg:leading-7"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {discoversubheading}
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 pt-6 sm:pt-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="bg-[#4328EB] text-white w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-md">
            {tryforfreebtn}
          </button>
          <button className="text-[#4328EB] font-medium flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-md">
            <a href="#pricing">{viewpricebtn}</a>
            <span>
              <img src={BlueArrow} alt="Learn More" />
            </span>
          </button>
        </motion.div>
      </div>
      <motion.div
        className="relative flex flex-col items-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <div className="w-full">
          <img
            src={Gradient}
            alt="Gradient"
            className="w-full object-cover min-h-[200px] sm:min-h-[300px] lg:min-h-[400px] mt-6 sm:mt-8"
          />
        </div>
        <div className="absolute bottom-5 w-full flex flex-col items-center">
          <img
            src={imgUrl || HeroImage}
            alt="hero image"
            className="mb-10 w-full max-w-[85%] sm:mb-20 px-3 sm:px-10 sm:mx-12 lg:max-w-[65%]"
          />
          <div className="flex flex-col items-center w-full px-4 sm:px-0 lg:flex-row lg:justify-between lg:px-20">
            <p className="text-white text-center text-base sm:text-lg lg:text-lg">
              Trusted by these companies
            </p>
            {renderCompanyImages()}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Discover;
