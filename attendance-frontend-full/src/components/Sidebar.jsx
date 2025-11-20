// Sidebar component placeholder
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ role }) => {
  const menus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Courses", path: "/courses" },
    { label: "Sessions", path: "/sessions" },
    { label: "View Attendance", path: "/view-attendance" },
  ];

  if (role === "teacher") {
    menus.push({ label: "Mark Attendance", path: "/mark-attendance" });
  }

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-6">
      <h2 className="text-xl font-bold mb-6">Menu</h2>

      <ul className="space-y-3">
        {menus.map((m, index) => (
          <li key={index}>
            <NavLink
              to={m.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg font-medium transition ${
                  isActive ? "bg-blue-600" : "hover:bg-gray-800"
                }`
              }
            >
              {m.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
