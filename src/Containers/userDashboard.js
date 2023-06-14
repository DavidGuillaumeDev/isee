import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CardDashboard from "../Components/DashboardAdmin/cardDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faClock,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import ButtonDashboard from "../Components/DashboardAdmin/buttonDashboard";
import { GetUserIdButton } from "../Api/usersApi";
import { fetchUserVideos, blockVideo } from "../Api/videoApi";

const UserDashboard = () => {
  const lastVideoViews = 2500;
  const lastVideoComments = 1050;
  const [userId, setUserId] = useState(null);
  const [videos, setVideos] = useState([]);

  const fetchUserId = () => {
    const userIdFromToken = GetUserIdButton();
    if (userIdFromToken) {
      setUserId(userIdFromToken);
    }
  };

  const fetchUserVideosData = () => {
    if (userId) {
      fetchUserVideos(userId)
        .then((videosData) => {
          setVideos(videosData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleBlockVideo = (videoId) => {
    blockVideo(videoId)
      .then(() => {
        fetchUserVideosData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    fetchUserVideosData();
  }, [userId]);

  const getClassFromState = (video) => {
    if (video.isHidden) {
      return "bg-red-500 text-white rounded-2xl px-2 py-1";
    } else if (video.isBlocked) {
      return "bg-orange-500 text-white rounded-2xl px-2 py-1";
    } else {
      return "bg-green-500 text-white rounded-2xl px-2 py-1";
    }
  };

  const generateActionButtons = (video) => {
    const actions = [
      {
        label: "Détails",
        classes:
          "mr-2 text-blue-600 hover:text-blue-900 border border-blue-600 hover:border-blue-900 rounded-md px-3 py-1 m-1 hover:bg-blue-200",
        icon: faUserCheck,
      },
      {
        label: "Public",
        classes:
          "mr-2 text-green-600 hover:text-green-900 border border-green-600 hover:border-green-900 rounded-md px-3 py-1 m-1 hover:bg-green-200",
        icon: faUserCheck,
      },
      {
        label: "Privé",
        classes:
          "text-red-600 hover:text-red-900 border border-red-600 hover:border-red-900 rounded-md px-3 py-1 m-1 hover:bg-red-200",
        icon: faLock,
      },
      {
        label: "Non Repertorié",
        classes:
          "text-orange-600 hover:text-orange-900 border border-orange-600 hover:border-orange-900 rounded-md px-3 py-1 m-1 hover:bg-orange-200",
        icon: faClock,
      },
      {
        label: "Supprimer",
        classes:
          "text-red-600 hover:text-red-900 border border-red-600 hover:border-red-900 rounded-md px-3 py-1 m-1 hover:bg-red-200",
        icon: faTrashAlt,
      },
    ];

    return actions
      .filter((action) => action.label !== video.state)
      .map((action) => (
        <button
          className={action.classes}
          key={action.label}
          onClick={() => {
            if (action.label === "Non Repertorié") {
              console.log(video._id)
              handleBlockVideo(video._id);
            }
          }}
        >
          <FontAwesomeIcon icon={action.icon} className="mr-1" />
          {action.label}
        </button>
      ));
  };

  return (
    <div className="dashboard-admin p-8 mt-16">
      <h1 className="text-4xl font-semibold mb-6 text-gray-800 text-center font-mono">
        Bienvenue sur votre tableau de bord créateur de contenu
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <CardDashboard
          text="Nombre de vues sur votre dernière vidéo"
          stat={lastVideoViews}
        />
        <CardDashboard
          text="Nombre de commentaires sur votre dernière vidéo"
          stat={lastVideoComments}
        />
        <CardDashboard
          text="Lien vers votre dernière vidéo"
          stat={
            <Link to={`/video`} className="block underline-none">
              Cliquez ici
            </Link>
          }
        />
      </div>
      <div className="gap-4 mb-8 justify-start flex">
        <Link to={`/add-video`}>
          <ButtonDashboard text="Ajouter une vidéo" />
        </Link>
      </div>

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
            {videos.map((video) => (
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
    </div>
  );
};

export default UserDashboard;
