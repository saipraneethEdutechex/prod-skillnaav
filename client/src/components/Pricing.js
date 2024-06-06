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

  return (
    <div id="pricing" className="py-12 my-12 pb-12 lg:py-16">
      <h1 className="text-center font-medium text-2xl lg:text-4xl text-gray-900">
        {priceheading}
      </h1>
      <p className="pt-4 pb-10 text-center text-gray-600 lg:text-lg"></p>
      <div className="flex flex-col gap-6 lg:flex-row">
        {pricingcard.map((card, index) => (
          <div
            key={index}
            className={`w-full bg-${card.bgcolor}-100 p-6 flex flex-col justify-between shadow-lg rounded-lg`}
          >
            <div>
              <h3
                className={`font-medium text-${card.color}-700 text-xl lg:text-2xl`}
              >
                {card.plantype}
              </h3>
              <p className="pt-3 text-gray-900 lg:text-lg">
                {card.plantypesubhead}
              </p>
              <h2
                className={`pt-4 text-2xl font-medium text-${card.color}-700 lg:text-3xl`}
              >
                {card.price}
              </h2>
              <ul className={`flex flex-col gap-2 pt-4 text-${card.color}-900`}>
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
            <button
              className={`mt-4 bg-white py-3 text-${card.color}-700 font-medium rounded hover:bg-${card.bgcolor}-200 transition`}
            >
              {card.pricebtn}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;
