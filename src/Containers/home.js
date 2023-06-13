import React, { useEffect, useState } from "react";
import Card from "../Components/card";
import { fetchAllVideos } from "../Api/videoApi";




const Home = () => {
  document.title = "Home";
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
          key={video._id}
          videoId={video._id}
          thumbnail={video.thumbnailUrl}
          userImage={video.userImage}
          title={video.title}
          userName={video.userName}
          views={video.views}
          date={video.date}
        />
      ))}
    </div>
  );
};

export default Home;
