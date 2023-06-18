import React, { useState, useEffect } from "react";
import { getVideoById, updateVideo } from "../Api/videoApi";
import { useParams } from "react-router-dom";
import "../Styles/index.css";

const VideoDetails = () => {
  const [videoData, setVideoData] = useState(null);
  const [commentsData, setCommentsData] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailFile] = useState();
  const { videoId } = useParams();
  const [status, setStatus] = useState("private");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(videoData.title);
    setEditedDescription(videoData.description);
  };

  const handleSubmit = () => {
    if (videoData) {
      const updatedVideoData = {
        title: title !== "" ? title : videoData.title,
        description: description !== "" ? description : videoData.description,
        thumbnailUrl:
          thumbnailUrl !== undefined ? thumbnailUrl : videoData.thumbnailUrl,
        status,
      };
      updateVideo(videoData._id, updatedVideoData);
      setIsEditing(false);
    }
  };

  const fetchVideoData = async (videoId) => {
    try {
      const data = await getVideoById(videoId);
      setCommentsData(data.comments);
      setVideoData(data);
      document.title = data.title;

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideoData(videoId);
  }, [videoId]);

  if (!videoData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="font-mono min-h-screen bg-gray-200 p-8 mt-20">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
        {isEditing ? (
          <h1 className="text-4xl font-semibold mb-8 text-indigo-600 text-center border-b-2 pb-2">
            Modification de la vidéo
          </h1>
        ) : (
          <h1 className="text-4xl font-semibold mb-8 text-indigo-600 text-center border-b-2 pb-2">
            Détails de la vidéo
          </h1>
        )}
        <label className="block mb-6">
          <span className="text-gray-700 text-xl font-bold">Titre:</span>
          {isEditing ? (
            <input
              type="text"
              id="title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="mt-1 block w-full h-12 text-lg rounded-md bg-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          ) : (
            <p>{videoData.title}</p>
          )}
        </label>
        <label className="block mb-6">
          <span className="text-gray-700 text-xl font-bold">Description:</span>
          {isEditing ? (
            <textarea
              id="description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="mt-1 block w-full h-24 text-lg rounded-md bg-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          ) : (
            <p>{videoData.description}</p>
          )}
        </label>
        {isEditing ? (
          <label className="block mb-6">
            <span className="text-gray-700 text-xl font-bold">
              Fichier images:
            </span>
            <input
              type="file"
              id="thumbnailFile"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
              className="mt-1 block w-full h-12 text-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
        ) : (
          <p>{videoData.thumbnailUrl}</p>
        )}
        <label className="block mb-6">
          <span className="text-gray-700 text-xl font-bold">
            État de la vidéo:
          </span>
          {isEditing ? (
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full h-12 text-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="private">Privé</option>
              <option value="public">Public</option>
              <option value="NR">Non Repertorié</option>
            </select>
          ) : (
            <p>{status}</p>
          )}
        </label>

        {isEditing ? (
          <button
            type="button"
            className="bg-indigo-500 text-white w-full h-12 rounded-md"
            onClick={handleSubmit}
          >
            Enregistrer
          </button>
        ) : (
          <button
            type="button"
            className="bg-indigo-500 text-white w-full h-12 rounded-md"
            onClick={handleEdit}
          >
            Modifier
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoDetails;
