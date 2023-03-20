import React from 'react';
import VideoPlayer from '../Components/VideoPage/videoPlayer';
import LiveChat from '../Components/VideoPage/liveChat';
import CardVideoPage from '../Components/VideoPage/cardVideoPage';
import Comments from '../Components/VideoPage/comments';
import "../Styles/index.css";

const VideoPage = () => {
  document.title = "VideoPage";

  return (
    <div className="video-page-container">
      <div className="video-and-livechat-container mt-24 mx-24">
        <div className="video-and-comments-container">
          <div className="custom-border mb-6">
            <VideoPlayer src="https://youtu.be/IELSJpKuZq0" />
          </div>
          <div className="custom-border">
            <Comments />
          </div>
        </div>
        <div className="live-chat-container mt-6 md:mt-0 md:ml-6">
          <div className="custom-border mb-6">
            <LiveChat />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6">
            <CardVideoPage className="custom-border" />
            <CardVideoPage className="custom-border" />
            <CardVideoPage className="custom-border" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
