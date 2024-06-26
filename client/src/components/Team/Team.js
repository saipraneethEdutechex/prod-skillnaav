import React, { useState } from "react";
import Slider from "react-slick";
import Modal from "react-modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import linkedin from "../../assets/linkedin_blue.png";
import HemRanjiniCropped from "../../assets/HemRanjiniCropped.png";
import KrishnaPillaiCropped from "../../assets/KrishnaPillaiCropped.png";
import AkanshaCropped from "../../assets/Akansha.jpg";
import "./Team.scss";
import { useSelector } from "react-redux";

const Team = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const { skillnaavData } = useSelector((state) => state.root);

  const openModal = (member) => {
    setSelectedMember(member);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedMember(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (
    !skillnaavData ||
    !skillnaavData.team ||
    skillnaavData.team.length === 0
  ) {
    return null;
  }

  const { teamheading, teamsubheading } = skillnaavData.team[0];
  const teammember = skillnaavData.teammember.map((item, index) => {
    return item;
  });

  return (
    <div
      id="team"
      className="team-section w-full h-full flex flex-col rounded-lg justify-center items-center px-4 py-12 my-12 pb-12 md:py-12 lg:py-20 gap-10"
    >
      <h1 className="text-3xl md:text-4xl lg:text-5xl text-white text-center mb-4">
        {teamheading}
      </h1>
      <p className="text-lg md:text-xl text-white max-w-2xl text-center mb-8">
        {teamsubheading}
      </p>
      <div className="w-full">
        <Slider {...settings}>
          {teammember.map((item) => (
            <div key={item._id} className="flex justify-center">
              <div className="team-card bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-lg max-w-xs flex flex-col items-center">
                <div className="team-image-container relative mb-6 flex items-center justify-center rounded-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.teammemberName}
                    className="team-image object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <h1 className="text-xl md:text-2xl text-gray-900 font-bold mb-2 text-center">
                  {item.teammemberName}
                </h1>
                <p className="text-sm md:text-base text-center text-gray-600 mb-1">
                  {item.teammemberDesgn}
                </p>
                <p className="text-sm md:text-base text-center text-gray-700 mb-4">
                  {item.teammemberDesc.substring(0, 120)}
                </p>
                <button
                  onClick={() => openModal(item)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold w-full transition-colors duration-300 hover:bg-green-700"
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {modalIsOpen && selectedMember && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Team Member Details"
          className="team-modal"
          overlayClassName="modal-overlay"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedMember.teammemberName}
              </h2>
              <button
                onClick={closeModal}
                className="modal-close-button"
                aria-label="Close Modal"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-image-container">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.teammemberName}
                  className="modal-image"
                />
              </div>
              <p className="text-base text-gray-700 mt-4 mb-2">
                {selectedMember.teammemberDesgn}
              </p>
              <p className="text-base text-gray-700 mb-4">
                {selectedMember.teammemberDesc}
              </p>
              <button
                onClick={() =>
                  window.open(selectedMember.teammemberLinkedin, "_blank")
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 mr-4"
              >
                <img
                  src={linkedin}
                  alt="LinkedIn"
                  className="inline-block w-5 h-5 mr-2"
                />
                Connect on LinkedIn
              </button>
              <button
                onClick={closeModal}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Team;
