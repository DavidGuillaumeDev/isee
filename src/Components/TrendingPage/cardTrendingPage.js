import React from 'react';
import { Link } from 'react-router-dom';

const CardTrendingPage = ({ thumbnail, title, userName, views, date, userImage, description }) => {
  return (
    <Link to={`/video`} className="block underline-none">
      <div className="bg-white rounded-lg overflow-hidden shadow-md p-4 mb-6 flex max-w-4xl">
        <img className="rounded w-64 h-40 object-cover" src={thumbnail} alt={title} />
        <div className="ml-4 flex flex-col justify-between flex-grow">
          <div>
            <div className="flex items-center mb-2">
              <img className="w-10 h-10 rounded-full mr-4" src={userImage} alt={userName} />
              <div>
                <h2 className="font-semibold text-lg">{title}</h2>
                <p className="text-gray-600">{userName}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p>{views} vues</p>
              <p>{date}</p>
            </div>  
            <div className="text-description overflow-hidden whitespace-normal overflow-ellipsis">
              {description}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardTrendingPage;
