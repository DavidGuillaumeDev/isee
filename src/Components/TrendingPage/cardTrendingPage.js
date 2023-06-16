import React,{useEffect,useState} from 'react';
import DefaultPicture from "../../Images/DefaultUser.png"
import DefaultImage from "../../Images/miniatureTest.jpg"

import { Link } from 'react-router-dom';

const CardTrendingPage = ({ thumbnail, title, userName, views, date, userImage, description,videoId }) => {
  const [pictureSrc, setPictureSrc] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadPictureImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/images/pp/${userImage}`
        );
        if (!response.ok) {
          // if HTTP-status is 404-599
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
        const response = await fetch(
          `http://localhost:3000/images/thumbnail/${thumbnail}`
        );
        if (!response.ok) {
          // if HTTP-status is 404-599
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

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  return (
    <Link to={`/video/${videoId}`} className="block underline-none">
      <div className="bg-white rounded-lg overflow-hidden shadow-md p-4 mb-6 flex max-w-4xl">
        <img className="rounded w-64 h-40 object-cover" src={imageSrc} alt={title} />
        <div className="ml-4 flex flex-col justify-between flex-grow">
          <div>
            <div className="flex items-center mb-2">
              <img className="w-10 h-10 rounded-full mr-4" src={pictureSrc} alt={userName} />
              <div>
                <h2 className="font-semibold text-lg">{title}</h2>
                <p className="text-gray-600">{userName}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p>{views} vues</p>
              <p>{formatDate(date)}</p>
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
