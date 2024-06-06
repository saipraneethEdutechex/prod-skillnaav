import React from "react";
import Navbar from "../../components/Navbar";
import Discover from "../../components/Discover";
import Vision from "../../components/Vision";
import Features from "../../components/Features";
import Team from "../../components/Team/Team";
import Pricing from "../../components/Pricing";
import Faq from "../../components/Faq";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";

function Home() {
  const { skillnaavData } = useSelector((state) => state.root);

  return (
    <div className="font-inter">
      <Navbar />
      {/* {skillnaavData && (
        <>
          <Discover />
          <div className="container mx-auto px-4 lg:px-20">
            <Vision />
          </div>
          <div className="container mx-auto px-4 lg:px-20">
            <Features />
          </div>
          <div className="container mx-auto px-4 lg:px-20">
            <Team />
            <Pricing />
            <Faq />
            <Contact />
            <Footer />
          </div>
        </>
      )} */}
      {skillnaavData && (
        <>
        
          <Discover />
          <div className="px-[20px] lg:px-20 mx-auto">
            <Vision />
            <Features />
            <Team />
            <Pricing />
            <Faq />
            <Contact />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
