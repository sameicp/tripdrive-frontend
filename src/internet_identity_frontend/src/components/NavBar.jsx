import { Link } from "react-router-dom";
import { useState } from "react";

export default function NavBar({ login, logout, isAuthenticated, principal }) {
  const pages = [
    { page: "Home", path: "/" },
    { page: "Book here", path: "/request/ride" },
    { page: "Request Update", path: "/request/update" },
    { page: "Ride History", path: "/ride/history" },
    { page: "Account", path: "/account" },
  ];

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setMobileMenuOpen(!isMobileMenuOpen);
  }

  function shortenString(inputString) {
    if (inputString.length >= 10) {
      const shortenedString =
        inputString.substring(0, 5) +
        "..." +
        inputString.substring(inputString.length - 6);
      return shortenedString;
    } else {
      return inputString;
    }
  }

  return (
    <nav id="header" className="fixed top-0 w-full z-30 py-1 shadow-lg">
      <div className="w-full flex items-center justify-between mt-0 px-6 py-2">
        <Link to={"/"}>
          <div className="flex items-center">
            <h1 className="text-lg font-bold text-blue-gray-600 hover:text-blue-gray-200 uppercase tracking-widest">
              Tripdrive
            </h1>
          </div>
        </Link>

        <div className="md:hidden">
          <button
            className="bg-blue-600 text-gray-200 p-2 rounded hover:bg-gray-600 hover:text-gray-100 tracking-widest"
            onClick={isAuthenticated ? logout : login}
          >
            {isAuthenticated ? "Log out" : "Log in"}
          </button>
        </div>

        {isAuthenticated && (
          <div
            className={`md:flex ${
              isMobileMenuOpen ? "block" : "hidden"
            } md:block text-center md:text-left`}
          >
            <nav className="md:flex items-center justify-center text-base text-blue-600 pt-4 md:pt-0">
              {pages.map(({ page, path }) => (
                <Link
                  className="block md:inline-block no-underline hover:text-gray-100 hover:bg-gray-600 font-medium text-lg py-2 px-4 rounded md:mr-4"
                  to={path}
                  key={page}
                >
                  {page}
                </Link>
              ))}
            </nav>
          </div>
        )}

        <div
          className={`flex items-center mt-4 md:mt-0 ${
            isMobileMenuOpen ? "block" : "hidden"
          } md:block`}
        >
          <div className="auth flex items-center">
            {isAuthenticated && (
              <div className="p-2 mr-4">
                <span className="text-gray-500 font-semibold font-serif">
                  {shortenString(principal)}
                </span>
              </div>
            )}
            <button
              className="bg-blue-600 text-gray-200 p-2 rounded hover:bg-gray-600 hover:text-gray-100 tracking-widest"
              onClick={isAuthenticated ? logout : login}
            >
              {isAuthenticated ? "Log out" : "Log in"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
