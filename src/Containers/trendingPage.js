import React from 'react';
import "../Styles/index.css";
import Miniature from '../Images/miniatureTest.jpg';
import ProfilPicture from '../Images/profilePictureTest.jpg';
import CardTrendingPage from '../Components/TrendingPage/cardTrendingPage';
import { FiTrendingUp } from "react-icons/fi";


const TrendingPage = () => {
  document.title = "Tendances";

  const trendingVideos = [
    {
      id: 1,
      userImage: ProfilPicture,
      thumbnail: Miniature,
      title: "Parc de la colline aux oiseaux",
      userName: "Ville de Caen",
      views: "1 500 000",
      date: "15 mars 2023"
    },
    {
      id: 2,
      userImage: ProfilPicture,
      thumbnail: Miniature,
      title: "Parc de la colline aux oiseaux",
      userName: "Ville de Caen",
      views: "1 500 000",
      date: "15 mars 2023"
    },
    {
      id: 2,
      userImage: ProfilPicture,
      thumbnail: Miniature,
      title: "Parc de la colline aux oiseaux",
      userName: "Ville de Caen",
      views: "1 500 000",
      date: "15 mars 2023"
    },
    {
      id: 2,
      userImage: ProfilPicture,
      thumbnail: Miniature,
      title: "Parc de la colline aux oiseaux",
      userName: "Ville de Caen",
      views: "1 500 000",
      date: "15 mars 2023"
    },
    {
      id: 2,
      userImage: ProfilPicture,
      thumbnail: Miniature,
      title: "Parc de la colline aux oiseaux",
      userName: "Ville de Caen",
      views: "1 500 000",
      date: "15 mars 2023"
    },
    {
      id: 2,
      userImage: ProfilPicture,
      thumbnail: Miniature,
      title: "Parc de la colline aux oiseaux",
      userName: "Ville de Caen",
      views: "1 500 000",
      date: "15 mars 2023"
    }
  ];

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
          {trendingVideos.map((video) => (
            <CardTrendingPage
              key={video.id}
              thumbnail={video.thumbnail}
              title={video.title}
              userName={video.userName}
              views={video.views}
              date={video.date}
              userImage={video.userImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;
