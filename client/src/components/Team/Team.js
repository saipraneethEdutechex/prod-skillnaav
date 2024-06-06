import React, { useState } from "react";
import Slider from "react-slick";
import Modal from "react-modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import linkedin from "../../assets/linkedin_blue.png";
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
  const { teammember } = skillnaavData;
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
                <div className="relative h-32 w-32 md:h-56 md:w-44 mb-6 flex items-center justify-center rounded-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.teammemberName}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
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
          className="fixed inset-0 flex items-center justify-center p-4 modal-content"
          overlayClassName="fixed inset-0 modal-overlay"
        >
          <div className="bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-lg max-w-3xl w-full">
            <div className="flex flex-col items-center">
              <div className="relative h-40 w-40 md:h-48 md:w-48 mb-6">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.teammemberName}
                  className="object-cover w-full h-full rounded-full transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h1 className="text-lg md:text-xl lg:text-2xl text-gray-900 font-bold mt-4">
                {selectedMember.teammemberName}
              </h1>
              <p className="text-sm md:text-base text-center text-gray-600">
                {selectedMember.teammemberDesgn}
              </p>
              <p className="text-sm md:text-base text-center text-gray-700 mt-2">
                {selectedMember.teammemberDesc}
              </p>
              <button
                onClick={() =>
                  window.open(selectedMember.teammemberLinkedin, "_blank")
                }
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 mt-4"
              >
                <img src={linkedin} alt="LinkedIn" width={20} height={20} />
                <span className="ml-2">Connect on LinkedIn</span>
              </button>
              <button
                onClick={closeModal}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold mt-2 transition-colors duration-300 hover:bg-red-700"
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
