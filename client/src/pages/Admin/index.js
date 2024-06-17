import React, { useEffect, useState, useMemo, lazy, Suspense } from "react";
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

// Lazy-loaded components
const AdminDiscover = lazy(() => import("./AdminDiscover"));
const AdminVision = lazy(() => import("./AdminVision"));
const AdminFeatures = lazy(() => import("./AdminFeatures"));
const AdminTeam = lazy(() => import("./AdminTeam"));
const AdminPricing = lazy(() => import("./AdminPricing"));
const AdminFaqs = lazy(() => import("./AdminFaqs"));
const AdminContact = lazy(() => import("./AdminContact"));

// Loader component for suspense fallback
const Loader = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

const Admin = () => {
  const { skillnaavData } = useSelector((state) => state.root);
  const [selectedTab, setSelectedTab] = useState("Discover");

  const navItems = useMemo(
    () => [
      { label: "Discover", component: <AdminDiscover />, icon: <FaHome /> },
      { label: "Vision", component: <AdminVision />, icon: <FaEye /> },
      { label: "Features", component: <AdminFeatures />, icon: <FaCog /> },
      { label: "Team", component: <AdminTeam />, icon: <FaUsers /> },
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

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-md border-b">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="flex items-center">
            <img
              src={SkillnaavLogo}
              alt="Skillnaav Logo"
              className="w-24 h-16 md:w-28 md:h-20 mr-3"
            />
            <span className="text-white text-lg md:text-xl font-medium">
              Admin Panel
            </span>
          </div>
          <span
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/admin-login";
            }}
            className="text-white text-lg md:text-xl font-medium cursor-pointer hover:underline"
            style={{ marginRight: "20px" }}
          >
            Logout
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="bg-gray-800 text-gray-200 w-16 md:w-64 py-6 shadow-md">
          <ul>
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700 transition ${
                  selectedTab === item.label ? "bg-gray-900" : ""
                }`}
                onClick={() => handleTabSelect(item.label)}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="hidden md:block">{item.label}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-10 bg-gray-100 overflow-y-auto">
          <Suspense fallback={<Loader />}>
            {navItems.map((item) =>
              item.label === selectedTab ? (
                <div key={item.label} className="mb-4">
                  {item.component}
                </div>
              ) : null
            )}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default Admin;
