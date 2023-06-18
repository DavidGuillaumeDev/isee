import React, { useState, useEffect } from "react";
import ButtonDashboard from "../Components/DashboardAdmin/buttonDashboard";
import HomeUser from "../Components/UserPage/homeUser";
import CommentUser from "../Components/UserPage/commentsUser";
import VideoUser from "../Components/UserPage/videosUser";
import { useParams } from "react-router-dom";
import { getUserById } from "../Api/usersApi";
import DefaultPicture from "../Images/DefaultUser.png";

const UserPage = () => {
  const [selectedComponent, setSelectedComponent] = useState("videos");
  const [userData, setUserData] = useState(null);
  const [videoData, setVideoData] = useState(null);
  const [pictureSrc, setPictureSrc] = useState(null);
  const [commentsData, setCommentsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = useParams();

  const fetchData = async (idUser) => {
    try {
      const data = await getUserById(idUser);
      setCommentsData(data.comments);
      setVideoData(data.videos);
      setUserData(data.user);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPictureImage = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/images/pp/${userData.profilePicture}`
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setPictureSrc(
        `http://localhost:3000/images/pp/${userData.profilePicture}`
      );
    } catch (error) {
      console.error("No image found, setting to default");
      setPictureSrc(DefaultPicture);
    }
  };

  useEffect(() => {
    fetchData(userId);
  }, [userId]);

  useEffect(() => {
    if (userData) {
      loadPictureImage();
    }
  }, [userData]);

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "videos":
        return <VideoUser videoData={videoData} userData={userData} />;
      case "comments":
        return (
          <CommentUser
            commentsData={commentsData}
            userData={userData}
            videoData={videoData}
          />
        );
      default:
        return <HomeUser />;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-admin p-8 mt-16">
      <h1 className="text-4xl font-semibold mb-6 text-gray-800 text-center font-roboto">
        <div className="flex items-center justify-center p-4">
          {pictureSrc && (
            <img
              className="w-10 h-10 rounded-full"
              src={pictureSrc}
              alt={userData.name}
            />
          )}
          <div className="pl-4" />
          <p>{userData.name}</p>
        </div>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <ButtonDashboard
          text="Voir les vidéos"
          onClick={() => setSelectedComponent("videos")}
        />
        <ButtonDashboard
          text="Voir les commentaires"
          onClick={() => setSelectedComponent("comments")}
        />
      </div>
      {renderSelectedComponent()}
    </div>
  );
};

export default UserPage;
