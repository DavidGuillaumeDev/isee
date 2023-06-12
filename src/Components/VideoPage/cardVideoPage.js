import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Miniature from '../../Images/miniatureTest.jpg';


const CardVideoPage = ({ videoId,thumbnail, title, userName, views, date, userImage }) => {
  const [imageSrc, setImageSrc] = useState(null);


  // useEffect(() => {
  //   const loadImage = async () => {
  //     try {
  //       const imageModule = await import(`../../Images/${thumbnail}`);
  //       setImageSrc(imageModule.default);
  //     } catch (error) {
  //       console.error(error);
  //       setImageSrc(null);
  //     }
  //   };

  //   loadImage();
  // }, [thumbnail]);

    // Conversion et formatage de la date
    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    }
  
  
  return (
    <Link to={`/video/${videoId}`} className="block underline-none">
      <div className="bg-white rounded-lg overflow-hidden shadow-md p-4 mb-6">
      {imageSrc ? (
          <img className="w-full h-auto max-w-full max-h-64 min-h-64 object-cover" src={imageSrc} alt={title} />
        ) : (
          <img className="rounded w-full max-h-64 min-h-64 object-cover" src={Miniature} alt={title} />
        )}        <div className="flex items-center my-2">
          <img className="w-10 h-10 rounded-full mr-4" src={userImage}/>
          <div>
            <h2 className="font-semibold text-lg">{title}</h2>
            <p className="text-gray-600">{userName}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p>{views} vues</p>
          <p>{formatDate(date)}</p> {/* Utilisation de la fonction de formatage ici */}        </div>
      </div>
    </Link>
  );
};

export default CardVideoPage;