import React, { useEffect, useState }  from 'react';
import Card from '../Components/card';
import Miniature from '../Images/miniatureTest.jpg';
import ProfilPicture from '../Images/profilePictureTest.jpg';
import { fetchAllVideos } from "../Api/videoApi"



const Home = () => {
    document.title = "Home";
    const [videos, setVideos] = useState([]);

    useEffect(() => {
      console.log("test")
      fetchAllVideos()
        .then((videosData) => {
          setVideos(videosData); // Met à jour les vidéos avec les données récupérées de l'API
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    const videos = [
        {
          id: 1,
          thumbnail: Miniature,
          userImage: ProfilPicture,
          title: 'Parc de la colline aux oiseaux',
          userName: 'Ville de Caen',
          views: 1500000,
          date: '15 mars 2021'
        },
        {
          id: 1,
          thumbnail: Miniature,
          userImage: ProfilPicture,
          title: 'Parc de la colline aux oiseaux',
          userName: 'Ville de Caen',
          views: 1500000,
          date: '15 mars 2021'
        },
        {
          id: 1,
          thumbnail: Miniature,
          userImage: ProfilPicture,
          title: 'Parc de la colline aux oiseaux',
          userName: 'Ville de Caen',
          views: 1500000,
          date: '15 mars 2021'
        },
        {
          id: 1,
          thumbnail: Miniature,
          userImage: ProfilPicture,
          title: 'Parc de la colline aux oiseaux',
          userName: 'Ville de Caen',
          views: 1500000,
          date: '15 mars 2021'
        },
        {
          id: 1,
          thumbnail: Miniature,
          userImage: ProfilPicture,
          title: 'Parc de la colline aux oiseaux',
          userName: 'Ville de Caen',
          views: 1500000,
          date: '15 mars 2021'
        },
        {
          id: 1,
          thumbnail: Miniature,
          userImage: ProfilPicture,
          title: 'Parc de la colline aux oiseaux',
          userName: 'Ville de Caen',
          views: 1500000,
          date: '15 mars 2021'
        },
        {
          id: 1,
          thumbnail: Miniature,
          userImage: ProfilPicture,
          title: 'Parc de la colline aux oiseaux',
          userName: 'Ville de Caen',
          views: 1500000,
          date: '15 mars 2021'
        },
        {
          id: 1,
          thumbnail: Miniature,
          userImage: ProfilPicture,
          title: 'Parc de la colline aux oiseaux',
          userName: 'Ville de Caen',
          views: 1500000,
          date: '15 mars 2021'
        },
        {
          id: 1,
          thumbnail: Miniature,
          userImage: ProfilPicture,
          title: 'Parc de la colline aux oiseaux',
          userName: 'Ville de Caen',
          views: 1500000,
          date: '15 mars 2021'
        }
      ];

  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-24 mx-24">
      {videos.map((video) => (
        <Card
          key={video._id}
          videoId={video._id}
          thumbnail={video.thumbnailUrl}
          userImage={video.userImage || DefaultUserProfilePicture}
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