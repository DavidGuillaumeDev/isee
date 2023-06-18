import React from "react";
import Card from "../card";

const VideoUser = ({ videoData, userData }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div>
        <h1 className="text-4xl font-semibold mb-6 text-gray-800 text-center font-mono">
          Vidéos mises en lignes par {userData.name}
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-24 mx-24">
        {videoData.map((video) => (
          <Card
            key={video._id}
            videoId={video._id}
            thumbnail={video.thumbnailUrl}
            userImage={userData.profilePicture}
            title={video.title}
            userName={userData.name}
            views={video.views}
            date={video.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoUser;
