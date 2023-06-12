import React, { useEffect, useState } from "react";
import VideoPlayer from "../Components/VideoPage/videoPlayer";
import LiveChat from "../Components/VideoPage/liveChat";
import CardVideoPage from "../Components/VideoPage/cardVideoPage";
import Comments from "../Components/VideoPage/comments";
import "../Styles/index.css";
import ProfilPicture from "../Images/profilePictureTest.jpg";
import { getVideoById, fetchSuggUserVideos } from "../Api/videoApi";
import { useParams  } from "react-router-dom";

const VideoPage = () => {
  const { videoId } = useParams();



  document.title = "VideoPage";
  const [videoData, setVideoData] = useState(null);
  const [commentsData, setCommentsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState();
  const [suggData, setSuggData] = useState([]);

  const fetchVideoData = async (videoId) => {
    try {
      const data = await getVideoById(videoId);
      setCommentsData(data.comments);
      setVideoData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchVideoData(videoId);
  }, [videoId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);
  
  
  useEffect(() => {
    if (videoData) {
      const loadVideo = async () => {
        try {
          const videoModule = await import(`../Videos/${videoData.fileUrl}`);
          setVideoUrl(videoModule.default);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setVideoUrl(null);
          setLoading(false);
        }
      };
  
      loadVideo();
  
      fetchSuggUserVideos(videoData.userId)
        .then((videosData) => {
          setSuggData(videosData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [videoData]);
  
  
  if (loading) {
    return <div>Loading...</div>;
  }

console.log("salut 2",videoId)

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="video-page-container" >
      <div className="video-and-livechat-container mt-24 mx-2 lg:mx-24">
        <div className="video-and-comments-container mb-6 mt-6">
          <div className="mb-6">
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
          </div>
        </div>
        <div className="live-chat-container mt-6 md:mt-0 md:ml-6 ">
          <div className="mb-6 mt-6">
            <LiveChat />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6">
            {suggData.map((video) => (
              <CardVideoPage
                key={video._id}
                videoId= {video._id}
                thumbnail={video.thumbnailUrl}
                title={video.title}
                userName={video.user.name}
                views={video.views}
                date={video.createdAt}
                userImage={video.user.profilePicture}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
