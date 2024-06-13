import React from "react";
import VisionImg from "../assets/canada_vis.jpg";
import { useSelector } from "react-redux";

const Vision = () => {
  const { skillnaavData } = useSelector((state) => state.root);

  if (
    !skillnaavData ||
    !skillnaavData.visionhead ||
    !skillnaavData.visionpoint
  ) {
    return null;
  }

  const { visionhead, visionpoint } = skillnaavData;

  return (
    <section
      id="vision"
      className="rounded-lg py-8 lg:py-16 bg-gradient-to-b from-purple-500 via-pink-500 to-red-500 my-16 text-white"
    >
      <div className="container mx-auto px-4 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="mb-8 md:mb-0">
            <img
              src={visionhead[0].visionImg}
              alt="Vision"
              className="rounded-lg shadow-lg object-cover w-full md:w-auto h-auto" // Responsive image
            />
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-8 text-center">
              {" "}
              {/* Added text-center */}
              {visionhead[0].visionheading}
            </h2>
            <p className="text-base lg:text-lg mb-6 max-w-3xl mx-auto lg:mx-0">
              {visionhead[0].visionsub}
            </p>
            <ul className="list-disc text-base lg:text-lg max-w-2xl mx-auto lg:mx-0 pl-5">
              {visionpoint.map((point, index) => (
                <li
                  key={index}
                  className={`text-base lg:text-lg mt-2 lg:mt-4 ${
                    index % 4 === 0
                      ? "text-blue-300"
                      : index % 4 === 1
                      ? "text-green-300"
                      : index % 4 === 2
                      ? "text-yellow-300"
                      : "text-pink-300"
                  }`}
                >
                  {point.visionpoint}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
