import React, { useState, useEffect } from "react";
import "../Styles/index.css";
import CardTrendingPage from "../Components/TrendingPage/cardTrendingPage";
import { FiTrendingUp } from "react-icons/fi";
import { getTopVideos } from "../Api/videoApi";

const TrendingPage = () => {
  document.title = "Tendances";
  const [videosData, setVideoData] = useState([]);
  useEffect(() => {
    const fetchTopVideos = async () => {
      try {
        const data = await getTopVideos();
        setVideoData(data);
      } catch (error) {
        console.error("Failed to fetch top videos:", error);
      }
    };

    fetchTopVideos();
  }, []);

  return (
    <div className="trending-page-container mt-24 mx-2 ">
      <div className="trending-videos-container mb-6 mt-6">
        <h1 className="text-4xl font-semibold mb-8 text-gray-800 text-center">
          <div className="font-mono flex items-center mb-6">
            <FiTrendingUp className="text-black text-xl mr-3" />
            Tendances
          </div>
        </h1>
        <div className="mt-6 grid grid-cols-1 gap-6">
          {videosData.map((video) => (
            <CardTrendingPage
              key={video._id}
              videoId={video._id}
              thumbnail={video.thumbnailUrl}
              title={video.title}
              userName={video.user.name}
              views={video.views}
              date={video.createdAt}
              userImage={video.user.profilePicture}
              description={video.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;
