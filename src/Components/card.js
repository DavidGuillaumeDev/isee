import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ thumbnail, userImage, title, userName, views, date, videoId }) => {
  return (
    <Link to={`/video/${videoId}`} className="p-4 block underline-none">
      <div className="bg-white rounded-lg overflow-hidden  mb-6">
        <img className="rounded w-full object-cover" src={thumbnail} alt={title} />
        <div className="flex items-center my-2">
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
    </Link>
  );
};

export default Card;