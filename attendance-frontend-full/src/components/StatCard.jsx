// StatCard component placeholder
import React from "react";

const StatCard = ({ title, value, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
      <div
        className={`w-12 h-12 rounded-full ${colorClasses[color]} flex items-center justify-center text-white text-xl font-bold`}
      >
        {value}
      </div>
    </div>
  );
};

export default StatCard;
