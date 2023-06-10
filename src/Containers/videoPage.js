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



const VideoPage = () => {
  const { videoId } = useParams();

  document.title = "VideoPage";
  const [videoData, setVideoData] = useState(null);
  const [commentsData, setCommentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState();

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

  const fetchVideoData = async (videoId) => {
    setLoading(true);
  
    try {
      const data = await getVideoById(videoId);
      setCommentsData(data.comments);
      setVideoData(data);
    } catch (error) {
      console.log(error);
    }
  
    setLoading(false);
  };
  
  useEffect(() => {
    const loadVideo = async () => {
      try {
        if (videoData) {
          const videoModule = await import(`../Videos/${videoData.fileUrl}`);
          setVideoUrl(videoModule.default);
        }
      } catch (error) {
        console.error(error);
        setVideoUrl(null);
      }
    };
  
    if (!videoData) {
      fetchVideoData(videoId);
    } else {
      loadVideo();
    }
  }, [videoId, videoData]);
  
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  // Reste du code pour afficher la vidéo et les données une fois qu'elles sont chargées
  

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
                    src={videoUrl}
                    title={videoData.title}
                    userImage={ProfilPicture}
                    userName={videoData.userName}
                    views={videoData.views}
                    description={videoData.description}
                  />
                 
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
