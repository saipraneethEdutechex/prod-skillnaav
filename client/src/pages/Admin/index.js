import React, { useEffect, useState, lazy, useMemo, Suspense } from "react";
import { useSelector } from "react-redux";
import {
  FaHome,
  FaEye,
  FaCog,
  FaUsers,
  FaDollarSign,
  FaQuestionCircle,
  FaEnvelope,
} from "react-icons/fa";
import SkillnaavLogo from "../../assets/skillnaav_logo-250w.png";

const AdminNavbar = lazy(() => import("./AdminNavbar"));
const AdminDiscover = lazy(() => import("./AdminDiscover"));
const AdminVision = lazy(() => import("./AdminVision"));
const AdminFeatures = lazy(() => import("./AdminFeatures"));
const AdminTeam = lazy(() => import("./AdminTeam"));
const AdminPricing = lazy(() => import("./AdminPricing"));
const AdminFaqs = lazy(() => import("./AdminFaqs"));
const AdminContact = lazy(() => import("./AdminContact"));

const Admin = () => {
  const { skillnaavData } = useSelector((state) => state.root);
  const [selectedTab, setSelectedTab] = useState("Navbar");

  const navItems = useMemo(
    () => [
      { label: "Navbar", component: <AdminNavbar />, icon: <FaHome /> },
      { label: "Discover", component: <AdminDiscover />, icon: <FaEye /> },
      { label: "Vision", component: <AdminVision />, icon: <FaCog /> },
      { label: "Features", component: <AdminFeatures />, icon: <FaUsers /> },
      { label: "Team", component: <AdminTeam />, icon: <FaUsers /> }, // Example of using the same icon for multiple items
      { label: "Pricing", component: <AdminPricing />, icon: <FaDollarSign /> },
      { label: "FAQs", component: <AdminFaqs />, icon: <FaQuestionCircle /> },
      { label: "Contact", component: <AdminContact />, icon: <FaEnvelope /> },
    ],
    []
  );

  const handleTabSelect = (label) => {
    setSelectedTab(label);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/admin-login";
    }
  }, []);

  useEffect(() => {
    // Set the default selected tab to "Navbar" when the component mounts
    setSelectedTab("Navbar");
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-md border-b">
        <div className="container mx-auto flex justify-center items-center py-4 px-6">
          <img
            src={SkillnaavLogo}
            alt="Skillnaav Logo"
            className="w-32 h-20 mr-auto"
          />
          <span className="text-white text-2xl font-medium">Admin Panel</span>
          <span
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/admin-login";
            }}
            className="text-white text-xl font-medium ml-auto cursor-pointer"
          >
            Logout
          </span>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="bg-gray-800 text-gray-200 w-64 py-6 shadow-md">
          <ul>
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700 transition ${
                  selectedTab === item.label ? "bg-gray-900" : ""
                }`}
                onClick={() => handleTabSelect(item.label)}
              >
                <span className="mr-2">{item.icon}</span> {/* Icon component */}
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 p-10 bg-gray-100 shadow-inner">
          <Suspense fallback={<div>Loading...</div>}>
            {navItems.map((item) =>
              item.label === selectedTab ? (
                <div key={item.label}>{item.component}</div>
              ) : null
            )}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default React.memo(Admin);
