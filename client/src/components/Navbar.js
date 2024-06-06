import React, { useState } from "react";
import SkillNaavLogo from "../assets/skillnaav_logo-250w.png";
import Menu from "../assets/Menu.svg";
import Close from "../assets/close.png";

const navLinks = [
  { name: "Discover", href: "#discover" },
  { name: "Vision", href: "#vision" },
  { name: "Features", href: "#features" },
  { name: "Team", href: "#team" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQs", href: "#faqs" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="flex flex-wrap items-center justify-between px-5 py-4 lg:container lg:mx-auto lg:px-20">
      <div className="flex items-center gap-x-5">
        <a href="/">
          <div>
            <img className="w-[150px]" src={SkillNaavLogo} alt="logo" />
          </div>
        </a>
        <div className="hidden lg:flex gap-x-8 ml-8">
          {navLinks.map((item, index) => (
            <a key={index} href={item.href}>
              <div className="text-[#36485C] font-medium">{item.name}</div>
            </a>
          ))}
        </div>
      </div>

      <div className="flex gap-x-5 items-center">
        <a href="#contacts">
          <div className="hidden lg:block font-medium text-white bg-[#451E5D] hover:bg-[#2c3b4e] px-4 py-2 rounded-md transition">
            Request A Call Back
          </div>
        </a>
        <div className="lg:hidden" onClick={toggleMenu}>
          <img
            src={menuOpen ? Close : Menu}
            alt="Menu Button"
            width={30}
            height={30}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-5 z-50">
          <div className="flex justify-end w-full p-4">
            <img
              src={Close}
              alt="Close Menu"
              onClick={toggleMenu}
              width={30}
              height={30}
            />
          </div>
          {navLinks.map((item, index) => (
            <a key={index} href={item.href} onClick={toggleMenu}>
              <div className="text-[#36485C] font-medium text-2xl">
                {item.name}
              </div>
            </a>
          ))}
          <a href="#contacts" onClick={toggleMenu}>
            <div className="font-medium text-white bg-[#451E5D] hover:bg-[#2c3b4e] px-6 py-3 rounded-md transition text-2xl">
              Request A Call Back
            </div>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
