import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetSkillNaavData, SetImages } from "../redux/rootSlice";
import BlueArrow from "../assets/blue-button.svg";
import Gradient from "../assets/Gradient.svg";
function importAll(r) {
  let images = {};
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

const allImages = importAll(
  require.context("../../src/images", false, /\.(png|jpe?g|svg)$/)
);

function Discover() {
  const dispatch = useDispatch();
  const { skillnaavData, images } = useSelector((state) => state.root);

  useEffect(() => {
    getData();
    getImage();
  }, []);

  const getData = async () => {
    try {
      const result = await axios.get("/api/skillnaav/get-data");
      dispatch(SetSkillNaavData(result.data.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getImage = async () => {
    try {
      const result = await axios.get("/get-image");
      dispatch(SetImages(result.data.data));
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  if (!skillnaavData) {
    return <div>Loading...</div>;
  }

  return (
    <div id="discover" className="pt-4 lg:pt-10">
      <div className="px-[20px] lg:px-[280px]">
        <h1 className="text-center text-[32px] leading-[40px] font-medium text-[#172026] lg:text-[64px] lg:leading-[72px]">
          {skillnaavData.discover[0]?.discoverheading ||
            "Discover tailored Internships worldwide with us."}
        </h1>
        <p className="text-center pt-6 text-[18px] font-normal text-[#36485C] lg:text-[18px] lg:leading-7">
          {skillnaavData.discover[0]?.discoversubheading ||
            "Empowering students to bridge the skill gap through personalized internships and professional support."}
        </p>
        <div className="align-center flex w-full py-8 justify-center gap-x-6">
          <button className="bg-[#4328EB] text-[#FFFFFF] w-1/2 px-8 py-4 rounded-[4px] lg:w-fit">
            {skillnaavData.discover[0]?.tryforfreebtn || "Try for free"}
          </button>

          <button className="text-[#4328EB] font-medium flex items-center justify-center gap-x-2 w-1/2 px-8 py-4 rounded-[4px] lg:w-fit">
            {skillnaavData.discover[0]?.viewpricebtn || "View Pricing"}
            <span>
              <img src={BlueArrow} alt="Learn More" />
            </span>
          </button>
        </div>
      </div>

      <div className="relative flex h-full w-full justify-center">
        <img
          src={Gradient}
          alt="Gradient"
          className="min-h-[500px] w-full object-cover lg:h-auto"
        />
        <div className="absolute bottom-5 flex w-full flex-col items-center">
          <img
            src={require("../assets/app_mockup.png")}
            alt="hero image"
            className="mb-10 md:w-[60%] md:mt-20 sm:mb-20 px-3 sm:px-20 sm:mx-12 lg:w-[60%] xl:w-[65%]"
          />
          <div className="flex w-full flex-col items-center lg:container lg:flex-row lg:justify-between lg:px-20">
            <p className="text-[white] text-center text-[16px] lg:text-[18px]">
              Trusted by these companies
            </p>
            <div className="grid grid-cols-3 items-center justify-center justify-items-center px-[20px] align-middle lg:grid-cols-5">
              {images.map((image, index) => (
                <motion.img
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  src={allImages[image.image]}
                  alt={`Company ${index + 1}`}
                  className="h-16 w-auto"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discover;
