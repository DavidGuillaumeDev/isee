import React from 'react';
import VideoPlayer from '../Components/VideoPage/videoPlayer';
import LiveChat from '../Components/VideoPage/liveChat';
import CardVideoPage from '../Components/VideoPage/cardVideoPage';
import Comments from '../Components/VideoPage/comments';
import "../Styles/index.css";
import TestVideo from "../Videos/test.mp4";
import Miniature from '../Images/miniatureTest.jpg';
import ProfilPicture from '../Images/profilePictureTest.jpg';


const VideoPage = () => {
  document.title = "VideoPage";
  
  const comments = [
    {
      id: 1,
      userImage: ProfilPicture, 
      userName: "Ville de Caen",
      date: "20 mars 2023",
      comment: "Ceci est un commentaire test"
    },
    {
      id: 2,
      userImage: ProfilPicture, 
      userName: "Ville de Caen",
      date: "20 mars 2023",
      comment: "Ceci est un commentaire test"
    },
    {
      id: 3,
      userImage: ProfilPicture, 
      userName: "Ville de Caen",
      date: "20 mars 2023",
      comment: "Ceci est un commentaire test"
    }
  ];

  const cards = [
    {
      id: 1,
      userImage: ProfilPicture,
      thumbnail: Miniature,
      title: "Parc de la colline aux oiseaux" ,
      userName: "Ville de Caen",
      views: "1 500 000",
      date: "15 mars 2023"
    },
    {
      id: 2,
      userImage: ProfilPicture,
      thumbnail: Miniature,
      title: "Parc de la colline aux oiseaux" ,
      userName: "Ville de Caen",
      views: "1 500 000",
      date: "15 mars 2023"
    },
  ];

  

  return (
    <div className="video-page-container ">
      <div className="video-and-livechat-container mt-24 mx-2 lg:mx-24">
        <div className="video-and-comments-container mb-6 mt-6">
          <div className="mb-6">
            <VideoPlayer 
              src={TestVideo} 
              title="Parc de la colline aux oiseaux" 
              userImage = {ProfilPicture}
              userName="Ville de Caen"
              views="1 500 000"
              description="Voici une vidéos transmettant l'atmosphère de nos parcs !"
            />
          </div>
          <div>
            <Comments comments={comments}/>
          </div>
        </div>
        <div className="live-chat-container mt-6 md:mt-0 md:ml-6 ">
          <div className="mb-6 mt-6">
            <LiveChat />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 ">
            {cards.map((card) => (
              <CardVideoPage
                key={card.id}
                thumbnail={card.thumbnail}
                title={card.title}
                userName={card.userName}
                views={card.views}
                date={card.date}
                userImage={card.userImage}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
