import React from "react";
import { useNavigate, Link } from "react-router-dom";

export const Navigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Logo
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 transition duration-300"
                  data-testid="home-link"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-blue-600 transition duration-300"
                  data-testid="about-link"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-blue-600 transition duration-300"
                  data-testid="contact-link"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/about")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 
                     transition duration-300 focus:outline-none focus:ring-2 
                     focus:ring-blue-500 focus:ring-opacity-50"
            data-testid="about-button"
          >
            Go to About
          </button>
        </div>
      </div>
    </nav>
  );
};
