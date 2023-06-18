import React from "react";

const ButtonDashboard = ({ text, onClick }) => {
  return (
    <button
      className="bg-white p-6 rounded-lg shadow-md text-xl font-semibold font-mono mb-4 text-gray-800"
      style={{ boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.2)" }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonDashboard;
