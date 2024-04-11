import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function NavBar({
  login,
  logout,
  isAuthenticated,
  principal,
  backendActor,
}) {
  const [username, setUsername] = useState("");

  const pages = [
    { page: "Home", path: "/" },
    { page: "Ride Request", path: "/request-ride" },
    { page: "Ride History", path: "/ride-history" },
    { page: "Account", path: "/account" },
  ];

  function shortenString(inputString) {
    // Check if the input string has at least 7 characters
    if (inputString.length >= 10) {
      // Extract the first three letters and the last four letters
      const shortenedString =
        inputString.substring(0, 5) +
        "..." +
        inputString.substring(inputString.length - 6);
      return shortenedString;
    } else {
      // Return the original string if it's too short
      return inputString;
    }
  }

  return (
    <nav
      id="header"
      className="fixed top-0 w-full z-30 py-1 bg-white shadow-lg border-b border-blue-400"
    >
      <div className="w-full flex items-center justify-between mt-0 px-6 py-2">
        <div className="flex items-center">
          <h1 className="text-lg font-bold text-blue-600">Tripdrive</h1>
          <label
            htmlFor="menu-toggle"
            className="cursor-pointer md:hidden block ml-4"
          >
            <svg
              className="fill-current text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </label>
          <input className="hidden" type="checkbox" id="menu-toggle" />
        </div>

        {/* Centered Links */}
        {isAuthenticated && (
          <div className="flex-grow text-center">
            <nav className="md:flex items-center justify-center text-base text-blue-600 pt-4 md:pt-0">
              {pages.map(({ page, path }) => (
                <Link
                  className="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4"
                  to={path}
                  key={page}
                >
                  {page}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Right-aligned buttons */}
        <div className="flex items-center">
          <div className="auth flex items-center">
            <button
              className="bg-transparent text-gray-800 p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700"
              onClick={isAuthenticated ? logout : login}
            >
              {isAuthenticated ? shortenString(principal) : "Log in"}
            </button>
            {isAuthenticated ? (
              <button
                className="bg-blue-600 text-gray-200 p-2 rounded hover:bg-blue-500 hover:text-gray-100"
                onClick={logout}
              >
                Log out
              </button>
            ) : (
              <Link
                className="bg-blue-600 text-gray-200 p-2 rounded hover:bg-blue-500 hover:text-gray-100"
                to={"/signup"}
              >
                Sign up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
