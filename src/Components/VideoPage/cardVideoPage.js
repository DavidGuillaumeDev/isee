import React from 'react';
import { FiUser } from 'react-icons/fi';

const CardVideoPage = ({ thumbnail, title, userName, views, date, userImage }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md p-4 mb-6">
      <img className="rounded w-full h-56 object-cover" src={thumbnail} alt={title} />
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
  );
};

export default CardVideoPage;