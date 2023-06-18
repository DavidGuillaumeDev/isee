import React, { useEffect, useState } from "react";
import Card from "../Components/card";
import { fetchAllVideos } from "../Api/videoApi";

const Home = () => {
  document.title = "Accueil";
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-24 mx-24">
      {videos.map((video) => (
        <Card
          userId={video.user._id}
          key={video._id}
          videoId={video._id}
          thumbnail={video.thumbnailUrl}
          userImage={video.user.profilePicture}
          title={video.title}
          userName={video.user.name}
          views={video.views}
          date={video.createdAt}
        />
      ))}
    </div>
  );
};

export default Home;
