import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import DefaultImage from '../../Images/miniatureTest.jpg';
import DefaultPicture from '../../Images/DefaultUser.png'


const CardVideoPage = ({ videoId,thumbnail, title, userName, views, date, userImage }) => {


  const [pictureSrc, setPictureSrc] = useState(null);
  const[imageSrc, setImageSrc] = useState(null)

  useEffect(() => {
    const loadPictureImage = async () => {
      try {
        const response = await fetch(`http://localhost:3000/images/pp/${userImage}`);
        console.log(response)
        if (!response.ok) { // if HTTP-status is 404-599
          throw new Error(response.statusText);
        }
        setPictureSrc(`http://localhost:3000/images/pp/${userImage}`);
      } catch (error) {
        console.error("No image found, setting to default");
        setPictureSrc(DefaultPicture);
      }
    };
    const loadImage = async () => {
      try {
        const response = await fetch(`http://localhost:3000/images/thumbnail/${thumbnail}`);
        if (!response.ok) { // if HTTP-status is 404-599
          throw new Error(response.statusText);
        }
        setImageSrc(`http://localhost:3000/images/thumbnail/${thumbnail}`);
      } catch (error) {
        console.error("No image found, setting to default");
        setImageSrc(DefaultImage);
      }
    };

    loadPictureImage();
    loadImage();
  }, [userImage, thumbnail]);

    // Conversion et formatage de la date
    const formatDate = (date) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    }
  
  
  return (
    <Link to={`/video/${videoId}`} className="block underline-none">
      <div className="bg-white rounded-lg overflow-hidden shadow-md p-4 mb-6">
          <img className="w-full h-auto max-w-full max-h-64 min-h-64 object-cover" src={imageSrc} alt={imageSrc} />
      <div className="flex items-center my-2">
          <img className="w-10 h-10 rounded-full mr-4" src={pictureSrc} alt={pictureSrc}/>
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