import React from "react";
import Check from "../assets/check.svg";
import { useSelector } from "react-redux";

function Pricing() {
  const { skillnaavData } = useSelector((state) => state.root);

  // Destructure pricing and pricingcard from skillnaavData
  const { pricing, pricingcard } = skillnaavData;

  // Check if pricing exists and has at least one item
  if (!pricing || pricing.length === 0) {
    return <div>No pricing data available.</div>;
  }

  // Extract priceheading from the first object in pricing array
  const { priceheading } = pricing[0];

  // Check if pricingcard exists and has at least one item
  if (!pricingcard || pricingcard.length === 0) {
    return <div>No pricing card data available.</div>;
  }

  // Define the color classes mapping
  const colorClasses = {
    teal: {
      bg: "bg-teal-100",
      text: "text-teal-700",
      subtext: "text-teal-900",
      hoverBg: "hover:bg-teal-200",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      subtext: "text-purple-900",
      hoverBg: "hover:bg-purple-200",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-700",
      subtext: "text-orange-900",
      hoverBg: "hover:bg-orange-200",
    },
  };

  // Map each card type to the corresponding color
  const cardTypes = {
    "Free Trial": colorClasses.teal,
    "Student (B2C)": colorClasses.purple,
    "Institutional (B2B)": colorClasses.orange,
  };

  console.log("Pricing cards:", pricingcard);

  return (
    <div id="pricing" className="py-12 my-12 pb-12 lg:py-16">
      <h1 className="text-center font-medium text-2xl lg:text-4xl text-gray-900">
        {priceheading}
      </h1>
      <p className="pt-4 pb-10 text-center text-gray-600 lg:text-lg"></p>
      <div className="flex flex-col gap-6 lg:flex-row">
        {pricingcard.map((card, index) => {
          const colorClass = cardTypes[card.plantype] || colorClasses.teal;

          return (
            <div
              key={index}
              className={`w-full ${colorClass.bg} p-6 flex flex-col justify-between shadow-lg rounded-lg`}
            >
              <div>
                <h3
                  className={`font-medium ${colorClass.text} text-xl lg:text-2xl`}
                >
                  {card.plantype}
                </h3>
                <p className={`pt-3 ${colorClass.subtext} lg:text-lg`}>
                  {card.plantypesubhead}
                </p>
                <h2
                  className={`pt-4 text-2xl font-medium ${colorClass.text} lg:text-3xl`}
                >
                  {card.plantype === "Institutional (B2B)" ? (
                    <span className="text-orange-700">Contact Us</span>
                  ) : (
                    card.price
                  )}
                </h2>
                <ul
                  className={`flex flex-col gap-2 pt-4 ${colorClass.subtext}`}
                >
                  <li className="flex items-center gap-2">
                    <img src={Check} alt="included" width={16} height={16} />
                    {card.pricepoint1}
                  </li>
                  <li className="flex items-center gap-2">
                    <img src={Check} alt="included" width={16} height={16} />
                    {card.pricepoint2}
                  </li>
                  <li className="flex items-center gap-2">
                    <img src={Check} alt="included" width={16} height={16} />
                    {card.pricepoint3}
                  </li>
                </ul>
              </div>
              {card.plantype === "Institutional (B2B)" ? (
                <a href="#contacts">
                  <div
                    className={`mt-4 bg-white py-3 text-center ${colorClass.text} font-medium rounded ${colorClass.hoverBg} transition`}
                  >
                    Contact Us
                  </div>
                </a>
              ) : (
                <button
                  className={`mt-4 bg-white py-3 ${colorClass.text} font-medium rounded ${colorClass.hoverBg} transition`}
                >
                  {card.pricebtn}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Pricing;
