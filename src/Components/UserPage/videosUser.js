import React, { useEffect, useState } from "react";
import { fetchAllVideos } from "../../Api/videoApi";
import Card from "../card";

const VideoUser = ({ user }) => {

    user = "Azazel";

    const [videos, setVideos] = useState([]);

    useEffect(() => {
      fetchAllVideos()
        .then((videosData) => {
          setVideos(videosData); // Met à jour les vidéos avec les données récupérées de l'API
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div>
                <h1 className="text-4xl font-semibold mb-6 text-gray-800 text-center font-mono">
                    Vidéos mises en lignes par {user}
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-24 mx-24">
                {videos.map((video) => (
                    <Card
                        key={video._id}
                        videoId={video._id}
                        thumbnail={video.thumbnailUrl}
                        userImage={video.user.profilePicture}
                        title={video.title}
                        userName={video.userName}
                        views={video.views}
                        date={video.date}
                    />
                    ))}
                </div>
        </div>
    );
};

export default VideoUser;