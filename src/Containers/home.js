import React, { useEffect, useState }  from 'react';
import Card from '../Components/card';
import Miniature from '../Images/miniatureTest.jpg';
import DefaultUserProfilePicture from '../Images/profilePictureTest.jpg';

import { fetchAllVideos } from "../Api/videoApi"



const Home = () => {
    document.title = "Home";
    const [videos, setVideos] = useState([]);


    useEffect(() => {
      fetchAllVideos()
        .then(videosData => {
          setVideos(videosData); // Met à jour les vidéos avec les données récupérées de l'API
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    const getThumbnailUrl = (thumbnail) => {
      // Vérifier si le fichier d'image existe
      try {
        const image = require(`../Images/${thumbnail}`);
        return image.default;
      } catch (error) {
        return Miniature;
      }
    };
    

  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-24 mx-24">
      {videos.map((video) => (
        <Card
          key={video._id}
          videoId={video._id}
          thumbnail={getThumbnailUrl(video.thumbnail)}
          userImage={video.userImage || DefaultUserProfilePicture}
          title={video.title}
          userName={video.user.name}
          views={video.views}
          date={video.date}
        />
      ))}
    </div>
  );
};

export default Home;
