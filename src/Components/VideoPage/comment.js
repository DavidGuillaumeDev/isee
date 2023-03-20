import React from 'react';

const Comment = ({ userImage, userName, date, comment }) => {
  return (
    <div className="flex items-center mb-4">
      <img className="w-10 h-10 rounded-full mr-4" src={userImage} alt={userName} />
      <div>
        <div className="flex items-center">
          <span className="font-semibold mr-2">{userName}</span>
          <span className="text-gray-600">{date}</span>
        </div>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default Comment;