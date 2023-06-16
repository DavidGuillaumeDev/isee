import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faClock,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import {
  fetchAllVideos,
  blockAndUnhideVideo,
  hideVideo,
  deleteVideo,
} from "../../Api/videoApi";

const VideoTable = ({ videos }) => {
  const [videosData, setVideosData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setVideosData(videos);
  }, [videos]);

  const getClassFromState = (video) => {
    if (video.isHidden) {
      return "bg-red-500 text-white rounded-2xl px-2 py-1";
    } else if (video.isBlocked) {
      return "bg-orange-500 text-white rounded-2xl px-2 py-1";
    } else {
      return "bg-green-500 text-white rounded-2xl px-2 py-1";
    }
  };

  const handleDeleteVideo = (videoId) => {
    deleteVideo(videoId)
      .then(() => {
        setVideosData((prevVideosData) =>
          prevVideosData.filter((video) => video._id !== videoId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUnblockAndUnhide = (videoId) => {
    blockAndUnhideVideo(videoId)
      .then(() => {
        setVideosData((prevVideosData) =>
          prevVideosData.map((video) =>
            video._id === videoId
              ? { ...video, isHidden: false, isBlocked: false }
              : video
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleHideVideo = (videoId) => {
    hideVideo(videoId)
      .then(() => {
        setVideosData((prevVideosData) =>
          prevVideosData.map((video) =>
            video._id === videoId
              ? { ...video, isHidden: true, isBlocked: false }
              : video
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const generateActionButtons = (video) => {
    const actions = [
      {
        label: "Détails",
        icon: faUserCheck,
        classes:
          "mr-2 text-blue-600 hover:text-blue-900 border border-blue-600 hover:border-blue-900 rounded-md px-3 py-1 m-1 hover:bg-blue-200",
      },
      {
        label: "Public",
        icon: faLock,
        classes:
          "mr-2 text-green-600 hover:text-green-900 border border-green-600 hover:border-green-900 rounded-md px-3 py-1 m-1 hover:bg-green-200",
      },
      {
        label: "Privé",
        icon: faClock,
        classes:
          "text-red-600 hover:text-red-900 border border-red-600 hover:border-red-900 rounded-md px-3 py-1 m-1 hover:bg-red-200",
      },
      {
        label: "Supprimer",
        icon: faTrashAlt,
        classes:
          "text-red-600 hover:text-red-900 border border-red-600 hover:border-red-900 rounded-md px-3 py-1 m-1 hover:bg-red-200",
      },
    ];
    return actions
      .filter((action) => action.label !== video.state)
      .map((action) => (
        <button
          className={action.classes}
          key={action.label}
          onClick={() => {
            if (action.label === "Privé") {
              handleHideVideo(video._id);
            } else if (action.label === "Public") {
              handleUnblockAndUnhide(video._id);
            } else if (action.label === "Supprimer") {
              handleDeleteVideo(video._id);
            } else if (action.label === "Détails") {
              navigate(`/video-details/${video._id}`);
            }
          }}
        >
          <FontAwesomeIcon icon={action.icon} className="mr-1" />
          {action.label}
        </button>
      ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <table className="table-fixed font-roboto">
        <thead>
          <tr className="text-center">
            <th className="col-id">Id</th>
            <th className="col-title">Titre de la vidéo</th>
            <th className="col-status">Etat</th>
            <th className="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videosData.map((video) => (
            <tr key={video.id}>
              <td className="text-center">{video._id}</td>
              <td className="text-center">{video.title}</td>
              <td className="p-2 text-center">
                <span className={getClassFromState(video)}>
                  {video.isHidden
                    ? "Privé"
                    : video.isBlocked
                    ? "Non Répertorié"
                    : "Public"}
                </span>
              </td>
              <td className="w-2/5 text-right">
                {generateActionButtons(video)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoTable;
