import React, { useRef, useState, useEffect } from "react";
import { FiDownload, FiMaximize2, FiPlay, FiPause } from "react-icons/fi";
import DefaultPicture from "../../Images/DefaultUser.png";
import "../../Styles/index.css";
import { Link } from "react-router-dom";

const VideoPlayer = ({
  src,
  title,
  userImage,
  userName,
  views,
  description,
  userId,
}) => {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  const [pictureSrc, setPictureSrc] = useState(null);

  useEffect(() => {
    const loadPictureImage = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/images/pp/${userImage}`
        );
        if (!response.ok) {
          // if HTTP-status is 404-599
          throw new Error(response.statusText);
        }
        setPictureSrc(`http://localhost:3000/images/pp/${userImage}`);
      } catch (error) {
        console.error("No image found, setting to default");
        setPictureSrc(DefaultPicture);
      }
    };

    loadPictureImage();
  }, [userImage]);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const currentProgress =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(currentProgress);
  };

  const handleScrub = (e) => {
    const scrubTime =
      (e.nativeEvent.offsetX / e.target.offsetWidth) *
      videoRef.current.duration;
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
    window.open(src, "_blank");
  };

  return (
    <div className="video-player-container">
      <div className="video-player relative">
        <video
          ref={videoRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onClick={handlePlayPause}
          className="w-full"
        />

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
      <div className="video-info flex flex-col items-start bg-gray-200 p-4">
        <h2 className="video-title text-xl font-bold mb-2">{title}</h2>
        <div className="user-and-views flex items-center mb-2">
          <Link to={`/user/${userId}`}>
            <div className="flex items-center flex-col justify-center">
              <img
                className="w-10 h-10 rounded-full"
                src={pictureSrc}
                alt={userName}
              />
              <div className="text-center">
                <p className="">{userName}</p>
              </div>
            </div>
          </Link>
          <span>{views} vues</span>
        </div>
        <p className="video-description text-sm">{description}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
