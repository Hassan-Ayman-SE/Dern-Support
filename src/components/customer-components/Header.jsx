import React, { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import logo from "../../../public/dern-logo.png";
import NotificationComponent from "../NotificationComponent";
import LogoutButton from "../LogoutButton";
import { GoTriangleDown } from "react-icons/go";



export default function Header(props) {
  const [open, setOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate

  const logout = () => {
  };

  const links = [
    { id: 1, title: "Home", url: "/" },
    { id: 3, title: "KnowledgeBase", url: "/articles" },
    { id: 4, title: "ServicesCatalog", url: "/services" },
  ];

  if (user) {
    links.push(
      { id: 5, title: "View Requests", url: "/allRequests" },
      { id: 6, title: "New Request", url: "/newRequest" }
    );
  }
  const handleUserTypeClick = (userType) => {
    navigate(`/login?userType=${userType}`);
    setDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <header className="p-0">
      {/* Desktop and larger screens */}
      <nav className="hidden lg:flex items-center justify-between py-2 bg-customWhite fixed top-0 z-50 w-full shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-3 sm:gap-10">
          <Link to="/">
            <img src={logo} alt="Dern Support Logo" className="ml-5 h-14 lg:h-16" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex justify-center">
          <ul className="flex gap-5 text-lg ">
            {links.map((link) => (
              <li
                key={link.id}
                className={`text-customDarkGray pt-2 cursor-pointer hover:text-customTeal ${location.pathname === link.url ? "text-customTeal" : ""
                  }`}
              >
                <Link to={link.url}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Notification and Logout Button */}
        {user ? (
          <div className="flex items-center gap-3 mr-5">
            <NotificationComponent /> {/* Notification Icon/Component */}
            <LogoutButton onClick={() => setOpen(false)} />
          </div>
        ) : (
          <div className="flex items-center gap-3 relative">
            {/* Dropdown Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center mr-5 bg-customTeal hover:bg-customCyan text-white font-bold py-2 px-4 rounded"
              aria-label="Login options"
            >
              Login <GoTriangleDown className="ml-2" />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white text-gray-800 border border-gray-300 rounded shadow-lg w-48">
                <ul className="flex flex-col">
                  <li>
                    <button
                      onClick={() => handleUserTypeClick("customers")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Customer
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleUserTypeClick("admin")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Admin
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleUserTypeClick("technician")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Technician
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile Header Bar */}
      <nav className="lg:hidden flex items-center justify-between py-4 bg-customWhite fixed top-0 z-50 w-full shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-3 sm:gap-10 -ml-2">
          <Link to="/">
            <img src={logo} alt="Dern Support Logo" className="h-12 lg:h-14" />
          </Link>
        </div>

        {/* Burger Menu Button */}
        <button
          className="text-4xl text-customDarkGray mr-4"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <MdClose /> : <MdMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <nav
        className={`lg:hidden text-white fixed z-40 w-full bg-customWhite transition-transform duration-300 ${open ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {/* Mobile Menu Links */}
        <ul className="flex flex-col gap-4 pt-24 pb-6 text-center font-robotoSlab">
          {links.map((link) => (
            <li
              key={link.id}
              className={`hover:text-customCyan border-b-2 pb-2 border-customTeal ${location.pathname === link.url ? "text-customTeal" : ""
                }`}
            >
              <Link
                to={link.url}
                className="text-customDarkGray focus:border-b-2 duration-150"
                onClick={() => setOpen(false)}
              >
                {link.title}
              </Link>
            </li>
          ))}
          <li className="flex justify-center">
            {user ? (
              <LogoutButton onClick={() => setOpen(false)} />
            ) : (
              <div className="relative">
                {/* Dropdown Button */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-customTeal hover:bg-customCyan text-white font-bold py-2 px-4 rounded"
                  aria-label="Login options"
                >
                  Login 🔽
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-gray-800 border border-gray-300 rounded shadow-lg w-48">
                    <ul className="flex flex-col">
                      <li>
                        <button
                          onClick={() => handleUserTypeClick("customers")}
                          className="w-full text-left px-4 py-2 hover:bg-gray-200"
                        >
                          Customer
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleUserTypeClick("admin")}
                          className="w-full text-left px-4 py-2 hover:bg-gray-200"
                        >
                          Admin
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleUserTypeClick("technician")}
                          className="w-full text-left px-4 py-2 hover:bg-gray-200"
                        >
                          Technician
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );

}
