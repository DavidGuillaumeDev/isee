import React, { useState } from "react";

const AddVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [status, setStatus] = useState("private");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to submit form data, e.g. through an API
    console.log({ title, description, videoFile, thumbnailFile, status });
  };

  return (
    <div className="font-mono min-h-screen bg-gray-200 p-8 mt-20">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold mb-8 text-indigo-600 text-center border-b-2 pb-2">
          Ajouter une vidéo
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-6">
            <span className="text-gray-700">Titre:</span>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full h-12 text-lg rounded-md bg-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Description:</span>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full h-24 text-lg rounded-md bg-gray-200 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Fichier vidéo:</span>
            <input
              type="file"
              id="videoFile"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="mt-1 block w-full h-12 text-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Fichier miniature:</span>
            <input
              type="file"
              id="thumbnailFile"
              accept="image/*"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
              className="mt-1 block w-full h-12 text-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">État de la vidéo:</span>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full h-12 text-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="private">Privé</option>
              <option value="public">Public</option>
              <option value="public">Non Repertorié</option>
            </select>
          </label>
          <button
            type="submit"
            className="bg-indigo-500 text-white w-full h-12 rounded-md"
          >
            Ajouter vidéo
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVideo;
