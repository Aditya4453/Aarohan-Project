import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">Attendance System</h1>

      <div className="flex items-center gap-6">
        {user && (
          <span className="font-medium text-gray-700">
            {user.name} ({user.role})
          </span>
        )}

        <Link
          to="/profile"
          className="text-gray-700 font-semibold hover:text-blue-600 transition"
        >
          Profile
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
