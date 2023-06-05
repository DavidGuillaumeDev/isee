import React, { useEffect, useState } from "react";
import VideoPlayer from "../Components/VideoPage/videoPlayer";
import LiveChat from "../Components/VideoPage/liveChat";
import CardVideoPage from "../Components/VideoPage/cardVideoPage";
import Comments from "../Components/VideoPage/comments";
import "../Styles/index.css";
import Miniature from "../Images/miniatureTest.jpg";
import ProfilPicture from "../Images/profilePictureTest.jpg";
import { getVideoById } from "../Api/videoApi";
import { useParams } from "react-router-dom";
import TestVid from "../Videos/test.mp4";

const VideoPage = () => {
  const { videoId } = useParams();

  document.title = "VideoPage";
  const [videoData, setVideoData] = useState(null);
  const [commentsData, setCommentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const cards = [
    {
      id: 1,
      userImage: ProfilPicture,
      thumbnail: Miniature,
      title: "Parc de la colline aux oiseaux",
      userName: "Ville de Caen",
      views: "1 500 000",
      date: "15 mars 2023",
    },
    {
      id: 2,
      userImage: ProfilPicture,
      thumbnail: Miniature,
      title: "Parc de la colline aux oiseaux",
      userName: "Ville de Caen",
      views: "1 500 000",
      date: "15 mars 2023",
    },
  ];

  const fetchVideoById = (videoId) => {
    setLoading(true);
    getVideoById(videoId)
      .then((data) => {
        setCommentsData(data.comments);
        setVideoData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Exemple d'appel de la fonction fetchVideoById avec un ID spécifique
    fetchVideoById(videoId);
  }, []);

  return (
    <div className="video-page-container">
      <div className="video-and-livechat-container mt-24 mx-2 lg:mx-24">
        <div className="video-and-comments-container mb-6 mt-6">
          <div className="mb-6">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="video-and-comments-container mb-6 mt-6">
                <div className="mb-6">
                  <VideoPlayer
                    src={TestVid} // URL ou chemin vers la vidéo de secours ou la miniature
                    title={videoData.title}
                    userImage={ProfilPicture}
                    userName={videoData.userName}
                    views={videoData.views}
                    description={videoData.description}
                  >
                 
                  </VideoPlayer>
                </div>
                <div>
                  <Comments comments={commentsData} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="live-chat-container mt-6 md:mt-0 md:ml-6 ">
          <div className="mb-6 mt-6">
            <LiveChat />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6">
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
