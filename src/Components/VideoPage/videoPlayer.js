import React, { useRef, useState } from 'react';
import { FiDownload, FiMaximize2, FiPlay, FiPause } from 'react-icons/fi';
import "../../Styles/index.css";

const VideoPlayer = ({ src, title, userImage, userName, views, description }) => {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);


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

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
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
    <div className="video-player-container">
      <div className="video-player relative">
        <video ref={videoRef} src={src} onTimeUpdate={handleTimeUpdate} onClick={handlePlayPause} className="w-full" />
        
        <div className="progress-container w-full absolute bottom-0 left-0">
          <div className="progress-bar" onClick={handleScrub}>
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="controls-container absolute bottom-0 left-0 w-full py-1 flex justify-between items-center opacity-0 hover:opacity-100 transition-opacity bg-black bg-opacity-50">
       
          <div className="left-controls flex items-center">
            <button onClick={handlePlayPause} className="text-white p-2">
              {isPlaying ? <FiPause /> : <FiPlay />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-16"
            />
          </div>

          <div className="right-controls flex items-center">
            <button onClick={handleFullscreen} className="text-white p-2">
              <FiMaximize2 />
            </button>
            <button onClick={handleDownload} className="text-white p-2">
              <FiDownload />
            </button>
          </div>

        </div>
      </div>
      <div className="video-info">
        <h2 className="video-title">{title}</h2>
        <p>{views} vues</p>
        <div className="user-info">
        <img className="w-10 h-10 rounded-full mr-4" src='data:image/jpeg;base64,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' alt="Kaydop" />
          <span className="user-name">{userName}</span>
        </div>
        <p className="video-description">{description}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;