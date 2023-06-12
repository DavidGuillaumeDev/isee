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
      date: "15 mars 2023",
      description: "On espère que ce making-of vous plaira. Il retrace un périple sans nom et vous permet de découvrir les coulisses inédites qui se sont produites lors du pièges. Merci à tous ceux qui ont dérushé des centaines d’heures d’images filmées sur 3 ans, et un immense merci à Dav Tuil et François Lefebvre qui ont passé des nuits blanches entières pour venir à bout du montage de ce projet titanesque."
    },
    {
      id: 2,
      userImage: ProfilPicture,
      thumbnail: Miniature,
      title: "Parc de la colline aux oiseaux 1 ",
      userName: "Ville de Caen",
      views: "1 500 000",
      date: "15 mars 2023",
      description: "On espère que ce making-of vous plaira. Il retrace un périple sans nom et vous permet de découvrir les coulisses inédites qui se sont produites lors du pièges. Merci à tous ceux qui ont dérushé des centaines d’heures d’images filmées sur 3 ans, et un immense merci à Dav Tuil et François Lefebvre qui ont passé des nuits blanches entières pour venir à bout du montage de ce projet titanesque."
    },
    {
      id: 3,
      userImage: ProfilPicture,
      thumbnail: Miniature,
      title: "Parc de la colline aux oiseaux 2",
      userName: "Ville de Caen",
      views: "1 500 000",
      date: "15 mars 2023",
      description: "On espère que ce making-of vous plaira. Il retrace un périple sans nom et vous permet de découvrir les coulisses inédites qui se sont produites lors du pièges. Merci à tous ceux qui ont dérushé des centaines d’heures d’images filmées sur 3 ans, et un immense merci à Dav Tuil et François Lefebvre qui ont passé des nuits blanches entières pour venir à bout du montage de ce projet titanesque."
    },
    {
      id: 4,
      userImage: ProfilPicture,
      thumbnail: Miniature,
      title: "Parc de la colline aux oiseaux 3",
      userName: "Ville de Caen",
      views: "1 500 000",
      date: "15 mars 2023",
      description: "On espère que ce making-of vous plaira. Il retrace un périple sans nom et vous permet de découvrir les coulisses inédites qui se sont produites lors du pièges. Merci à tous ceux qui ont dérushé des centaines d’heures d’images filmées sur 3 ans, et un immense merci à Dav Tuil et François Lefebvre qui ont passé des nuits blanches entières pour venir à bout du montage de ce projet titanesque."
    },
    {
      id: 5,
      userImage: ProfilPicture,
      thumbnail: Miniature,
      title: "Parc de la colline aux oiseaux 4",
      userName: "Ville de Caen",
      views: "1 500 000",
      date: "15 mars 2023",
      description: "On espère que ce making-of vous plaira. Il retrace un périple sans nom et vous permet de découvrir les coulisses inédites qui se sont produites lors du pièges. Merci à tous ceux qui ont dérushé des centaines d’heures d’images filmées sur 3 ans, et un immense merci à Dav Tuil et François Lefebvre qui ont passé des nuits blanches entières pour venir à bout du montage de ce projet titanesque."
    },
    {
      id: 6,
      userImage: ProfilPicture,
      thumbnail: Miniature,
      title: "Parc de la colline aux oiseaux 5",
      userName: "Ville de Caen",
      views: "1 500 000",
      date: "15 mars 2023",
      description: "On espère que ce making-of vous plaira. Il retrace un périple sans nom et vous permet de découvrir les coulisses inédites qui se sont produites lors du pièges. Merci à tous ceux qui ont dérushé des centaines d’heures d’images filmées sur 3 ans, et un immense merci à Dav Tuil et François Lefebvre qui ont passé des nuits blanches entières pour venir à bout du montage de ce projet titanesque."
    },
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
              description={video.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;
