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

  const memoizedData = useMemo(() => skillnaavData, [skillnaavData]);

  const cachedComponents = useMemo(
    () => ({
      Discover,
      Vision,
      Features,
      Team,
      Pricing,
      Faq,
      Contact,
      Footer,
    }),
    []
  );

  return (
    <div className="font-inter">
      <Navbar />

      {memoizedData ? (
        <Suspense
          fallback={
            <div className="px-[20px] lg:px-20 mx-auto">
              <Skeleton active />
            </div>
          }
        >
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
        </Suspense>
      ) : (
        <div className="px-[20px] lg:px-20 mx-auto">
          <Skeleton active />
        </div>
      )}
    </div>
  );
}

export default Home;
