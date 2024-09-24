import React from "react";
import CountUp from "react-countup";
import Seperator from "./Seperator";

function Stats() {
  const stats = [
    { label: "Satisfied Customers", value: 2500 },
    { label: "Successful Projects", value: 850 },
    { label: "Global Partners", value: 50 },
    { label: "Team Members", value: 35 },
  ];

  return (
    <section className="mb-24">
      <Seperator
        heading="Our Success in Numbers"
        text="We are proud of our achievements and the trust our clients place in us."
      />
      <div className="container mx-auto px-4 py-24 bg-customBlueLightBg rounded-xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-12 bg-customWhite shadow-xl rounded-3xl transform transition-all duration-500 hover:scale-105 hover:bg-customBlueLight"
            >
              <div className="text-6xl font-bold text-customCyan mb-6">
                <CountUp end={stat.value} duration={3.5} separator="," />
                {stat.label === "Satisfied Customers" ||
                  stat.label === "Team Members"
                  ? "+"
                  : ""}
              </div>
              <div className="text-2xl font-semibold text-customLight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
