import React, { useEffect, useState } from "react";
import VideoPlayer from "../Components/VideoPage/videoPlayer";
import LiveChat from "../Components/VideoPage/liveChat";
import CardVideoPage from "../Components/VideoPage/cardVideoPage";
import Comments from "../Components/VideoPage/comments";
import "../Styles/index.css";
import {
  getVideoById,
  fetchSuggUserVideos,
  incrementViews,
} from "../Api/videoApi";
import { useParams } from "react-router-dom";

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
    incrementViews(videoId);
    fetchVideoData(videoId);
  }, [videoId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [videoId]);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/videos/${videoData.fileUrl}`
        );
        if (!response.ok) {
          // Si le statut HTTP n'est pas dans la plage 200-299
          throw new Error(response.statusText);
        }
        setVideoUrl(`http://localhost:3000/videos/${videoData.fileUrl}`);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setVideoUrl(null);
        setLoading(false);
      }
    };

    if (videoData) {
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

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="video-page-container">
      <div className="video-and-livechat-container mt-24 mx-2 lg:mx-24">
        <div className="video-and-comments-container mb-6 mt-6">
          <div className="mb-6">
            <div className="video-and-comments-container mb-6 mt-6">
              <div className="mb-6">
                <VideoPlayer
                  src={videoUrl}
                  title={videoData.title}
                  userImage={videoData.user.profilePicture}
                  userName={videoData.user.name}
                  views={videoData.views}
                  description={videoData.description}
                  userId={videoData.user._id}
                />
              </div>
              <div>
                <Comments comments={commentsData} videoId={videoData._id} />
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
                videoId={video._id}
                thumbnail={video.thumbnailUrl}
                title={video.title}
                userName={video.user.name}
                views={video.views}
                date={video.createdAt}
                userImage={video.user.profilePicture}
                userId={videoData.user._id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
