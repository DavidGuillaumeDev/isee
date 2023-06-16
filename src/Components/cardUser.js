import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DefaultPicture from "../Images/DefaultUser.png";

const CardUser = ({ userId, userImage, userName, date }) => {
  const [pictureSrc, setPictureSrc] = useState(null);
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

    loadPictureImage();
  }, [userImage]);
  return (
    <Link to={`/user/${userId}`} className="block underline-none">
      <div className="bg-white rounded-lg overflow-hidden p-4 mb-6 shadow-md flex max-w-lg">
        <img
          className="w-[25%] h-auto max-w-[25%] max-h-64 min-h-64 object-cover "
          src={pictureSrc}
          alt={pictureSrc}
        />
        <div className="ml-4 flex flex-col justify-between flex-grow">
          <div>
            <div className="flex items-center mb-2 justify-center ">
              <div className="items-center justify-center flex">
                <p className="text-3xl">{userName}</p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p>{date}</p>
            </div>
            <div className="text-description overflow-hidden whitespace-normal overflow-ellipsis"></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardUser;
