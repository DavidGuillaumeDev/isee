import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Miniature from '../Images/miniatureTest.jpg';


const Card = ({ thumbnail, userImage, title, userName, views, date, videoId }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageModule = await import(`../Images/${thumbnail}`);
        setImageSrc(imageModule.default);
      } catch (error) {
        console.error(error);
        setImageSrc(null);
      }
    };

    loadImage();
  }, [thumbnail]);

  return (
    <Link to={`/video/${videoId}`} className="p-4 block underline-none">
      <div className="bg-white rounded-lg overflow-hidden mb-6 shadow-xl pb-2">
        {imageSrc ? (
          <img className="w-full h-auto max-w-full max-h-64 min-h-64 object-cover" src={imageSrc} alt={title} />
        ) : (
          <img className="rounded w-full max-h-64 min-h-64 object-cover" src={Miniature} alt={title} />
        )}
        <div className="flex items-center my-2 pl-2">
          <img className="w-10 h-10 rounded-full mr-4" src={userImage} alt={userName} />
          <div className="">
            <h2 className="font-semibold text-lg">{title}</h2>
            <p className="text-gray-600">{userName}</p>
          </div>
        </div>
        <div className="flex justify-between items-center pl-2">
          <p>{views} vues</p>
          <p>{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
