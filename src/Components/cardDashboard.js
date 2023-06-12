import React from 'react';

const CardDashboard = ({ text, stat }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold font-mono mb-4 text-gray-800">
            {text}
          </h2>
          <p className="text-lg text-gray-700">{stat}</p>
        </div>
  );
};

export default CardDashboard;
