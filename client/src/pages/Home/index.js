import React, { Suspense, lazy, useMemo } from "react";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";

const Discover = lazy(() => import("../../components/Discover"));
const Vision = lazy(() => import("../../components/Vision"));
const Features = lazy(() => import("../../components/Features"));
const Team = lazy(() => import("../../components/Team/Team"));
const Pricing = lazy(() => import("../../components/Pricing"));
const Faq = lazy(() => import("../../components/Faq"));
const Contact = lazy(() => import("../../components/Contact"));
const Footer = lazy(() => import("../../components/Footer"));

function Home() {
  const { skillnaavData } = useSelector((state) => state.root);

  // Memoize the entire skillnaavData to avoid re-rendering of components unnecessarily
  const memoizedData = useMemo(() => skillnaavData, [skillnaavData]);

  // Filter components based on the existence of data
  const componentsToRender = useMemo(() => {
    const components = [
      { Component: Discover, key: "discover" },
      { Component: Vision, key: "vision" },
      { Component: Features, key: "features" },
      { Component: Team, key: "team" },
      { Component: Pricing, key: "pricing" },
      { Component: Faq, key: "faq" },
      { Component: Contact, key: "contact" },
      { Component: Footer, key: "footer" },
    ];

    return components.filter(({ key }) => memoizedData?.[key]);
  }, [memoizedData]);

  return (
    <div className="font-inter min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <Navbar />
      <Suspense
        fallback={
          <div className="px-[20px] lg:px-20 mx-auto">
            <Skeleton active />
          </div>
        }
      >
        <div className=" mx-auto">
          {componentsToRender.map(({ Component, key }) => (
            <Component key={key} data={memoizedData[key]} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}

export default Home;
