import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../public/dern-logo.png";
import { IoSend } from "react-icons/io5";

const quickLinks = [
  { path: "/about", display: "About Us" },
  { path: "/privacy", display: "Privacy Policy" },
  { path: "/services", display: "Our Services" },
  { path: "/blog", display: "Blog" },
  { path: "/contact", display: "Contact" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-custom-gradient text-customGray py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap">
          {/* Logo and Description */}
          <div className="w-full lg:w-1/3 mb-6 text-center lg:text-left">

            <p className="text-customLightGray">
              Your trusted partner in tech support. We handle everything from quick fixes to major repairs, ensuring your systems run at their best.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full lg:w-1/4 mb-6 text-center lg:text-left">
            <h5 className="text-lg font-semibold text-white mb-3">Explore</h5>
            <ul>
              {quickLinks.map((item, index) => (
                <li key={index} className="mb-2">
                  <Link to={item.path} className="text-customLightGray hover:text-white">
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="w-full lg:w-1/3 mb-6 text-center lg:text-left">
            <h5 className="text-lg font-semibold text-white mb-3">Get in Touch</h5>
            <p className="text-customLightGray">123 Tech Lane, Silicon Valley, CA</p>
            <p className="text-customLightGray">Phone: (123) 456-7890</p>
            <p className="text-customLightGray">Email: support@dernsupport.com</p>
            <p className="text-customLightGray">Mon - Fri: 8am - 6pm</p>
          </div>

          {/* Newsletter */}
          <div className="w-full lg:w-1/3 mb-6 text-center lg:text-left">
            <h5 className="text-lg font-semibold text-white mb-3">Subscribe</h5>
            <p className="mb-3 text-customLightGray">Stay updated with our latest news and offers.</p>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Your Email"
                className="p-2 rounded-l-lg bg-customWhite text-customDark placeholder-gray-400"
              />
              <button className="bg-customTeal text-white p-2 rounded-r-lg hover:bg-customCyan">
                <IoSend />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="w-full text-center border-t border-gray-700 pt-4">
          <p className="text-customLightGray">
            &copy; {year} Dern Support. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
