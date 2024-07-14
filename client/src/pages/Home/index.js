import React, { Suspense, lazy, useMemo, useEffect, useState } from "react";
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

const Section = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return <div ref={sectionRef}>{isVisible ? children : null}</div>;
};

function Home() {
  const { skillnaavData } = useSelector((state) => state.root);

  const memoizedData = useMemo(() => skillnaavData, [skillnaavData]);

  return (
    <div className="font-inter">
      <Navbar />
      <div className="pt-20">
        {memoizedData ? (
          <Suspense
            fallback={
              <div className="px-[20px] lg:px-20 mx-auto">
                <Skeleton active />
              </div>
            }
          >
            <Section>
              <Discover />
            </Section>
            <div className="px-[20px] lg:px-20 mx-auto">
              <Section>
                <Vision className="mt-16" />
              </Section>
              <Section>
                <Features className="mt-16" />
              </Section>
              <Section>
                <Team className="mt-16" />
              </Section>
              <Section>
                <Pricing className="mt-16" />
              </Section>
              <Section>
                <Faq className="mt-16" />
              </Section>
              <Section>
                <Contact className="mt-16" />
              </Section>
              <Section>
                <Footer className="mt-16" />
              </Section>
            </div>
          </Suspense>
        ) : (
          <div className="px-[20px] lg:px-20 mx-auto">
            <Skeleton active />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
