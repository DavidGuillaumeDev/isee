import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DefaultPicture from "../Images/DefaultUser.png";
import DefaultImage from "../Images/miniatureTest.jpg";

const Card = ({
  userId,
  thumbnail,
  userImage,
  title,
  userName,
  views,
  date,
  videoId,
  description,
}) => {
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
    <Link to={`/video/${videoId}`} className="p-4 block underline-none">
      <div className="bg-white rounded-lg overflow-hidden mb-6 shadow-xl pb-2">
        <img
          className="w-full h-auto max-w-full max-h-64 min-h-64 object-cover"
          src={imageSrc}
          alt={title}
        />
        <div className="flex items-center my-2 pl-2">
          <Link to={`/user/${userId}`}>
            <div className="flex items-center flex-col justify-center">
              <img
                className="w-10 h-10 rounded-full"
                src={pictureSrc}
                alt={userName}
              />
              <div className="text-center">
                <p className="">{userName}</p>
              </div>
            </div>
          </Link>

          <div className="pl-4">
            <h2 className="font-semibold text-lg">{title}</h2>
          </div>
        </div>
        <div className="flex justify-between items-center pl-2">
          <p>{views} vues</p>
          <p>{formatDate(date)}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
