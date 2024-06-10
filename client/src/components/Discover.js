import React from "react";
import { motion } from "framer-motion";
import Gradient from "../assets/Gradient.svg";
import HeroImage from "../assets/app_mockup.png";
import Google from "../assets/Google.svg";
import Slack from "../assets/Slack.svg";
import Trustpilot from "../assets/Trustpilot.svg";
import Cnn from "../assets/CNN.svg";
import Clutch from "../assets/Clutch.svg";
import BlueArrow from "../assets/blue-button.svg";
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
  const { discoverheading, discoversubheading, tryforfreebtn, viewpricebtn } =
    discover;

  return (
    <motion.div
      id="discover"
      className="pt-4 lg:pt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="px-[20px] lg:px-[280px]">
        <motion.h1
          className="text-center text-[32px] leading-[40px] font-medium text-[#172026] lg:text-[64px] lg:leading-[72px]"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {discoverheading || ""}
        </motion.h1>
        <motion.p
          className="text-center pt-6 text-[18px] font-normal text-[#36485C] lg:text-[18px] lg:leading-7"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {discoversubheading || ""}
        </motion.p>
        <motion.div
          className="align-center flex w-full py-8 justify-center gap-x-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="bg-[#4328EB] text-[#FFFFFF] w-1/2 px-8 py-4 rounded-[4px] lg:w-fit">
            {tryforfreebtn || ""}
          </button>
          <button className="text-[#4328EB] font-medium flex items-center justify-center gap-x-2 w-1/2 px-8 py-4 rounded-[4px] lg:w-fit">
            {viewpricebtn || ""}
            <span>
              <img src={BlueArrow} alt="Learn More" />
            </span>
          </button>
        </motion.div>
      </div>
      <motion.div
        className="relative flex h-full w-full justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <img
          src={Gradient}
          alt="Gradient"
          className="min-h-[500px] w-full object-cover lg:h-auto"
        />
        <div className="absolute bottom-5 flex w-full flex-col items-center">
          <img
            src={HeroImage}
            alt="hero image"
            className="mb-10 md:w-[60%] md:mt-20 sm:mb-20 px-3 sm:px-20 sm:mx-12 lg:w-[60%] xl:w-[65%]"
          />
          <div className="flex w-full flex-col items-center lg:container lg:flex-row lg:justify-between lg:px-20">
            <p className="text-[white] text-center text-[16px] lg:text-[18px]">
              Trusted by these companies
            </p>
            <div className="grid grid-cols-3 items-center justify-center justify-items-center px-[20px] align-middle lg:grid-cols-5">
              <motion.img
                src={Google}
                alt="Google"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
              <motion.img
                src={Slack}
                alt="Slack"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              />
              <motion.img
                src={Trustpilot}
                alt="Trustpilot"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              />
              <motion.img
                src={Cnn}
                alt="Cnn"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              />
              <motion.img
                src={Clutch}
                alt="Clutch"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Discover;
