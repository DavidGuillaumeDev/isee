import React from 'react';
import { Link } from 'react-router-dom';

const CardTrendingPage = ({ thumbnail, title, userName, views, date, userImage }) => {
  return (
    <Link to={`/video`} className="block underline-none max-w-lg">
      <div className="bg-white rounded-lg overflow-hidden shadow-md p-4 mb-6 flex">
        <img className="rounded w-32 h-20 object-cover mr-4" src={thumbnail} alt={title} />
        <div className="flex flex-col justify-between">
          <div className="flex items-center mb-2">
            <img className="w-10 h-10 rounded-full mr-4" src={userImage} alt={userName} />
            <div>
              <h2 className="font-semibold text-lg">{title}</h2>
              <p className="text-gray-600">{userName}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p>{views} vues</p>
            <p>{date}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardTrendingPage;