import React, { useState, useEffect } from "react";
import "../../CSS/Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handleLocationChange = () => {
      setActiveLink(window.location.href);
      console.log(activeLink);
    };

    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, []);

  const handleExpandCollapse = () => {
    setIsCollapsed(!isCollapsed);
    console.log(isCollapsed);
  };

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  return (
    <nav className={`mt-26 sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-top-wrapper">
        <div className="sidebar-top">
          <Link to="/support-requests/getAll" className="logo__wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-cube"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#FFFFFF"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M21 16.008v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.008c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008a2.016 2.016 0 0 0 2 0l7 -4.008c.619 -.355 1 -1.01 1 -1.718z" />
              <path d="M12 22v-10" />
              <path d="M12 12l8.73 -5.04" />
              <path d="M3.27 6.96l8.73 5.04" />
            </svg>
            <span className="hide company-name pr-9">Admin Dashbord</span>
          </Link>
        </div>
        <button
          className="expand-btn"
          type="button"
          onClick={handleExpandCollapse}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="exp-btn"
            role="img"
          >
            <title id="exp-btn">Expand/Collapse Menu</title>
            <path
              d="M6.00979 2.72L10.3565 7.06667C10.8698 7.58 10.8698 8.42 10.3565 8.93333L6.00979 13.28"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="sidebar-links">
        <ul>
          <li>
            <Link
              to="/support-requests/getAll"
              title="Dashboard"
              className={`tooltip ${
                activeLink.includes("/support-requests/getAll") ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/support-requests/getAll")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-layout-dashboard"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4h6v8h-6z" />
                <path d="M4 16h6v4h-6z" />
                <path d="M14 12h6v8h-6z" />
                <path d="M14 4h6v4h-6z" />
              </svg>
              <span className="link hide">View All Request</span>
              <span className="tooltip__content">View All Request</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/ViewAllServices"
              title="Dashboard"
              className={`tooltip ${
                activeLink.includes("/admin/ViewAllServices") ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/admin/ViewAllServices")}
            >
              <svg
                width="64px"
                height="64px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path
                    d="M546.133333 733.866667c2.133333-8.533333 2.133333-19.2 2.133334-29.866667s0-19.2-2.133334-29.866667l59.733334-42.666666c6.4-4.266667 8.533333-12.8 4.266666-19.2l-57.6-98.133334c-4.266667-6.4-10.666667-8.533333-17.066666-6.4L469.333333 539.733333c-14.933333-12.8-32-21.333333-51.2-29.866666l-6.4-72.533334c0-6.4-6.4-12.8-12.8-12.8h-113.066666c-6.4 0-12.8 6.4-12.8 12.8l-8.533334 74.666667c-19.2 6.4-34.133333 17.066667-51.2 29.866667L147.2 512c-6.4-2.133333-14.933333 0-17.066667 6.4l-57.6 98.133333c-4.266667 6.4-2.133333 14.933333 4.266667 19.2l59.733333 42.666667c-2.133333 8.533333-2.133333 19.2-2.133333 29.866667s0 19.2 2.133333 29.866666l-59.733333 42.666667c-6.4 4.266667-8.533333 12.8-4.266667 19.2l57.6 98.133333c4.266667 6.4 10.666667 8.533333 17.066667 6.4L213.333333 874.666667c14.933333 12.8 32 21.333333 51.2 29.866666l6.4 72.533334c0 6.4 6.4 12.8 12.8 12.8h113.066667c6.4 0 12.8-6.4 12.8-12.8l6.4-72.533334c19.2-6.4 34.133333-17.066667 51.2-29.866666l66.133333 29.866666c6.4 2.133333 14.933333 0 17.066667-6.4l57.6-98.133333c4.266667-6.4 2.133333-14.933333-4.266667-19.2l-57.6-46.933333zM341.333333 810.666667c-59.733333 0-106.666667-46.933333-106.666666-106.666667s46.933333-106.666667 106.666666-106.666667 106.666667 46.933333 106.666667 106.666667-46.933333 106.666667-106.666667 106.666667z"
                    fill="#ffffff"
                  />
                  <path
                    d="M893.866667 326.4c2.133333-10.666667 2.133333-19.2 2.133333-27.733333s0-17.066667-2.133333-27.733334l53.333333-38.4c6.4-4.266667 6.4-10.666667 4.266667-17.066666l-53.333334-91.733334c-4.266667-6.4-10.666667-8.533333-17.066666-4.266666l-61.866667 27.733333c-14.933333-10.666667-29.866667-19.2-46.933333-27.733333l-6.4-66.133334c2.133333-6.4-2.133333-10.666667-8.533334-10.666666h-104.533333c-6.4 0-12.8 4.266667-12.8 10.666666l-6.4 66.133334c-17.066667 6.4-32 14.933333-46.933333 27.733333l-61.866667-27.733333c-6.4-2.133333-12.8 0-17.066667 4.266666l-53.333333 91.733334c-4.266667 6.4-2.133333 12.8 4.266667 17.066666l53.333333 38.4V298.666667c0 8.533333 0 17.066667 2.133333 27.733333l-53.333333 38.4c-6.4 4.266667-6.4 10.666667-4.266667 17.066667l53.333334 91.733333c4.266667 6.4 10.666667 8.533333 17.066666 4.266667l61.866667-27.733334c14.933333 10.666667 29.866667 19.2 46.933333 27.733334l6.4 66.133333c0 6.4 6.4 10.666667 12.8 10.666667h104.533334c6.4 0 12.8-4.266667 12.8-10.666667l6.4-66.133333c17.066667-6.4 32-14.933333 46.933333-27.733334l61.866667 27.733334c6.4 2.133333 12.8 0 17.066666-4.266667l53.333334-91.733333c4.266667-6.4 2.133333-12.8-4.266667-17.066667l-59.733333-38.4zM704 405.333333c-59.733333 0-106.666667-46.933333-106.666667-106.666666s46.933333-106.666667 106.666667-106.666667 106.666667 46.933333 106.666667 106.666667-46.933333 106.666667-106.666667 106.666666z"
                    fill="#ffffff"
                  />
                </g>
              </svg>

              <span className="link hide">View All Services</span>
              <span className="tooltip__content">View All Services</span>
            </Link>
          </li>
          <li>
            <Link
              to="/spares"
              title="Market Overview"
              className={`tooltip ${
                activeLink.includes("/spares") ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/spares")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chart-bar"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                <path d="M9 8m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                <path d="M15 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                <path d="M4 20l14 0" />
              </svg>
              <span className="link hide">Spare</span>
              <span className="tooltip__content">Spare</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashbord/article"
              title="Article"
              className={`tooltip ${
                activeLink.includes("/dashbord/article") ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/dashbord/article")}
            >
              <svg
                className="h-20 w-20 text-stone-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="link hide">Article</span>
              <span className="tooltip__content">Article</span>
            </Link>
          </li>
          <li>
            <Link
              to="/dashbord/create-new-article"
              title="CreateNewArticle"
              className={`tooltip ${
                activeLink.includes("/dashbord/create-new-article")
                  ? "active"
                  : ""
              }`}
              onClick={() => handleLinkClick("/dashbord/create-new-article")}
            >
              <svg
                className="h-20 w-20 text-stone-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="21" y1="10" x2="3" y2="10" />
                <line x1="21" y1="6" x2="3" y2="6" />
                <line x1="21" y1="14" x2="3" y2="14" />
                <line x1="21" y1="18" x2="3" y2="18" />
              </svg>
              <span className="link hide">Create New Article</span>
              <span className="tooltip__content">Create New Article</span>
            </Link>
          </li>
          <li>
            <Link
              to="/technicians/createAccount"
              title="Create Technician Account"
              className={`tooltip ${
                activeLink.includes("/technicians/createAccount")
                  ? "active"
                  : ""
              }`}
              onClick={() => handleLinkClick("/technicians/createAccount")}
            >
              <svg
                className="h-12 w-12 text-slate-900"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <line x1="20" y1="8" x2="20" y2="14" />
                <line x1="23" y1="11" x2="17" y2="11" />
              </svg>
              <span className="link hide">Create Account</span>
              <span className="tooltip__content">Create Account</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/Reports"
              title="CreateNewArticle"
              className={`tooltip ${
                activeLink.includes("/admin/Reports") ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/admin/Reports")}
            >
              <svg
                fill="#ffffff"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 60 60"
                xmlSpace="preserve"
                width="64px"
                height="64px"
                stroke="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#CCCCCC"
                  strokeWidth="2.64"
                />
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g>
                      <path d="M53.5,49L53.5,49V1c0-0.6-0.4-1-1-1h-45c-0.6,0-1,0.4-1,1v58c0,0.6,0.4,1,1,1h35c0.3,0,0.5-0.1,0.7-0.3l10-10 c0.1-0.1,0.1-0.2,0.2-0.3v-0.1C53.5,49.2,53.5,49.1,53.5,49z M8.5,2h43v46h-9c-0.6,0-1,0.4-1,1v9h-33V2z M43.5,56.6V50h6.6 l-3.3,3.3L43.5,56.6z" />
                      <path d="M13.5,44h33c0.6,0,1-0.4,1-1V7c0-0.6-0.4-1-1-1h-33c-0.6,0-1,0.4-1,1v36C12.5,43.6,12.9,44,13.5,44z M14.5,14h7v28h-7 C14.5,42,14.5,22.1,14.5,14z M23.5,29h22v6h-22V29z M23.5,27v-6h22v6H23.5z M23.5,19v-5h22v5H23.5z M23.5,42v-5h22v5H23.5z M45.5,12h-22V8h22V12z M21.5,8v4h-7c0-0.8,0-4,0-4H21.5z" />
                      <rect x="16.5" y="16" width="3" height="2" />
                      <rect x="16.5" y="23" width="3" height="2" />
                      <rect x="16.5" y="31" width="3" height="2" />
                      <rect x="16.5" y="38" width="3" height="2" />
                      <path d="M22.5,47h-9c-0.6,0-1,0.4-1,1v6c0,0.6,0.4,1,1,1h9c0.6,0,1-0.4,1-1v-6C23.5,47.4,23.1,47,22.5,47z M21.5,53h-7v-4h7V53z" />
                      <rect x="26.5" y="48" width="7" height="2" />
                      <rect x="26.5" y="52" width="10" height="2" />
                    </g>
                  </g>
                </g>
              </svg>

              <span className="link hide">ٌReports</span>
              <span className="tooltip__content">ٌReports</span>
            </Link>
          </li>
          <li>
            <Link
              to="/DashboardAnalysis"
              title="Dashboard Analysis"
              className={`tooltip ${
                activeLink.includes("/DashboardAnalysis") ? "active" : ""
              }`}
              onClick={() => handleLinkClick("/DashboardAnalysis")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chart-pie"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 3.2a9 9 0 1 0 10.8 10.8a1 1 0 0 0 -1 -1h-6.8a2 2 0 0 1 -2 -2v-7a.9 .9 0 0 0 -1 -.8" />
                <path d="M15 3.5a9 9 0 0 1 5.5 5.5h-4.5a1 1 0 0 1 -1 -1v-4.5" />
              </svg>
              <span className="link hide">Analysis</span>
              <span className="tooltip__content">Analysis</span>
            </Link>
          </li>
          <li>
        
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
