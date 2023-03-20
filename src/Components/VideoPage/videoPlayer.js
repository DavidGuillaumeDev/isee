import React, { useRef, useState } from 'react';
import { FiDownload, FiMaximize2, FiPlay, FiPause } from 'react-icons/fi';

const VideoPlayer = ({ src, title, userImage, userName, views, description }) => {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(currentProgress);
  };

  const handleScrub = (e) => {
    const scrubTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * videoRef.current.duration;
    videoRef.current.currentTime = scrubTime;
  };

  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleDownload = () => {
    window.open(src, '_blank');
  };

  return (
    <div className="video-player">
      <video ref={videoRef} src={src} onTimeUpdate={handleTimeUpdate} onClick={handlePlayPause} className="w-full" />
      <div className="progress-bar" onClick={handleScrub}>
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="controls">
        <button onClick={handlePlayPause}>{isPlaying ? <FiPause /> : <FiPlay />}</button>
        <button onClick={handleFullscreen}>
          <FiMaximize2 />
        </button>
        <button onClick={handleDownload}>
          <FiDownload />
        </button>
      </div>
      <div className="video-info">
        <h2 className="video-title">{title}</h2>
        <p>{views} vues</p>
        <div className="user-info">
          <img src={userImage} alt={userName} className="user-image" />
          <span className="user-name">{userName}</span>
        </div>
        <p className="video-description">{description}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
