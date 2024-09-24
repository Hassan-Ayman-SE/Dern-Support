import React from "react";
import { useAuth } from "../contexts/auth";

const LogoutButton = ({ onClick }) => {
  const { logoutUser } = useAuth();

  return (
    <button
      onClick={() => {
        logoutUser();
        onClick();
      }}
      className={`mr-5 bg-customTeal hover:bg-red-500 text-white font-bold py-2 px-4 rounded`}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
