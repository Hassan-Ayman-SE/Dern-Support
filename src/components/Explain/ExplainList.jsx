import React from "react";
import Explain from "./Explain";

import Seperator from "../home-page-components/Seperator";

const ExplainList = () => {

  const image1 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYq1pHAo1SOtxnKZRBA_cpZLZalfqpop8KRQ&s";
  const image2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfbhTomKb_MxDJ1gQdfPWyd1wMg5nRqGX-Gg&s";
  const image3 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgeLtlrfcBQx4f9DMroEo1MHJ594J2j0vOBg&s";


  return (
    <div className="container mx-auto px-4 text-white">
      {/* Separator for the section */}
      <Seperator
        heading="Our Core Services"
        text="Comprehensive solutions for all your technology needs—from setup and installation to advanced troubleshooting."
      />

      <div className="mt-20 flex flex-col md:flex-row lg:flex-wrap gap-12 ">
        <Explain
          id="1"
          title="Network Solutions"
          text="Ensure seamless network connectivity with our expert services. We offer setup, optimization, and troubleshooting for home and office networks, ensuring smooth and reliable performance."
          image={image1}
          cardStyle="bg-customWhite shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          textStyle="text-customDarkGray"
          titleStyle="text-customTeal font-bold text-xl"
        />
        <Explain
          id="2"
          title="System Upgrades"
          text="Maximize your system's performance with hardware and software upgrades. Our team helps you stay up-to-date with the latest technologies to keep your devices running at peak efficiency."
          image={image2}
          cardStyle="bg-customWhite shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          textStyle="text-customDarkGray"
          titleStyle="text-customTeal font-bold text-xl"
        />
        <Explain
          id="3"
          title="Cybersecurity"
          text="Protect your digital assets with our advanced cybersecurity services. From antivirus setup to firewall installation, we ensure that your data remains safe from online threats."
          image={image2}  // Replace with appropriate image
          cardStyle="bg-customWhite shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          textStyle="text-customDarkGray"
          titleStyle="text-customTeal font-bold text-xl"
        />
      </div>
    </div>
  );
};

export default ExplainList;
