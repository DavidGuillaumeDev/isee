import React from 'react';
import Card from '../Components/card';

const Home = () => {
    document.title = "Home";

    const videos = [
        {
          id: 1,
          thumbnail: '../Images/miniatureTest.png',
          userImage: 'https://example.com/user1.jpg',
          title: 'Titre vidéo 1',
          userName: 'Nom d\'utilisateur 1',
          views: 1234,
          date: '15 mars 2023'
        },
        {
          id: 2,
          thumbnail: 'https://example.com/thumbnail2.jpg',
          userImage: 'https://example.com/user2.jpg',
          title: 'Titre vidéo 2',
          userName: 'Nom d\'utilisateur 2',
          views: 5678,
          date: '14 mars 2023'
        },
        {
          id: 2,
          thumbnail: 'https://example.com/thumbnail2.jpg',
          userImage: 'https://example.com/user2.jpg',
          title: 'Titre vidéo 2',
          userName: 'Nom d\'utilisateur 2',
          views: 5678,
          date: '14 mars 2023'
        },
        {
          id: 2,
          thumbnail: 'https://example.com/thumbnail2.jpg',
          userImage: 'https://example.com/user2.jpg',
          title: 'Titre vidéo 2',
          userName: 'Nom d\'utilisateur 2',
          views: 5678,
          date: '14 mars 2023'
        },
        {
          id: 2,
          thumbnail: 'https://example.com/thumbnail2.jpg',
          userImage: 'https://example.com/user2.jpg',
          title: 'Titre vidéo 2',
          userName: 'Nom d\'utilisateur 2',
          views: 5678,
          date: '14 mars 2023'
        },
        {
          id: 2,
          thumbnail: 'https://example.com/thumbnail2.jpg',
          userImage: 'https://example.com/user2.jpg',
          title: 'Titre vidéo 2',
          userName: 'Nom d\'utilisateur 2',
          views: 5678,
          date: '14 mars 2023'
        },
        {
          id: 2,
          thumbnail: 'https://example.com/thumbnail2.jpg',
          userImage: 'https://example.com/user2.jpg',
          title: 'Titre vidéo 2',
          userName: 'Nom d\'utilisateur 2',
          views: 5678,
          date: '14 mars 2023'
        },
        {
          id: 2,
          thumbnail: 'https://example.com/thumbnail2.jpg',
          userImage: 'https://example.com/user2.jpg',
          title: 'Titre vidéo 2',
          userName: 'Nom d\'utilisateur 2',
          views: 5678,
          date: '14 mars 2023'
        },
        {
          id: 2,
          thumbnail: 'https://example.com/thumbnail2.jpg',
          userImage: 'https://example.com/user2.jpg',
          title: 'Titre vidéo 2',
          userName: 'Nom d\'utilisateur 2',
          views: 5678,
          date: '14 mars 2023'
        },
        {
          id: 2,
          thumbnail: 'https://example.com/thumbnail2.jpg',
          userImage: 'https://example.com/user2.jpg',
          title: 'Titre vidéo 2',
          userName: 'Nom d\'utilisateur 2',
          views: 5678,
          date: '14 mars 2023'
        },
        {
          id: 2,
          thumbnail: 'https://example.com/thumbnail2.jpg',
          userImage: 'https://example.com/user2.jpg',
          title: 'Titre vidéo 2',
          userName: 'Nom d\'utilisateur 2',
          views: 5678,
          date: '14 mars 2023'
        },
        {
          id: 2,
          thumbnail: 'https://example.com/thumbnail2.jpg',
          userImage: 'https://example.com/user2.jpg',
          title: 'Titre vidéo 2',
          userName: 'Nom d\'utilisateur 2',
          views: 5678,
          date: '14 mars 2023'
        }
      ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-24 mx-24">
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
