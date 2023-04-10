import React from 'react';
import Card from '../Components/card';
import Miniature from '../Images/miniatureTest.jpg';
import ProfilPicture from '../Images/profilePictureTest.jpg';

const Home = () => {
    document.title = "Home";

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
          key={video.id}
          thumbnail={video.thumbnail}
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
