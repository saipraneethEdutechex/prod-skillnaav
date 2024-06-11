import React, { useEffect } from "react";
import { motion } from "framer-motion";
import BlueGradient from "../assets/blue-button.svg"; 
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SetSkillNaavData, SetImages } from "../redux/rootSlice";

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
    <div>
      {/* Discover Section */}
      <div className="lg:h-screen bg-no-repeat bg-cover flex justify-center items-center h-auto lg:py-0 py-10">
        <div className="flex justify-center items-center w-full h-full relative bg-white bg-opacity-70">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl p-6 lg:p-16 lg:px-32 rounded-3xl shadow-lg bg-white bg-opacity-70"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
              {skillnaavData.discover[0]?.discoverheading}
            </h2>
            <p className="text-lg text-gray-800 mb-8 text-center">
              {skillnaavData.discover[0]?.discoversubheading}
            </p>
            <div className="flex justify-center space-x-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {skillnaavData.discover[0]?.tryforfreebtn}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-green-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {skillnaavData.discover[0]?.viewpricebtn}
              </motion.button>
            </div>
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Discover;
