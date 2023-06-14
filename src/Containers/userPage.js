import React, { useState } from 'react';
import ButtonDashboard from '../Components/DashboardAdmin/buttonDashboard';
import HomeUser from '../Components/UserPage/homeUser';
import CommentUser from '../Components/UserPage/commentsUser';
import VideoUser from '../Components/UserPage/videosUser';


const UserPage = () => {
  const [selectedComponent, setSelectedComponent] = useState('home');

  const renderSelectedComponent = () => {
    switch(selectedComponent) {
      case 'home':
        return <HomeUser />;
      case 'videos':
        return <VideoUser />;
      case 'comments':
        return <CommentUser />;
      default:
        return <HomeUser />;
    }
  };

  return (
    <div className="dashboard-admin p-8 mt-16">
      
      <h1 className="text-4xl font-semibold mb-6 text-gray-800 text-center font-roboto">
        {/* Icone user - Pseudo */}
        Pseudo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <ButtonDashboard text="A propos" onClick={() => setSelectedComponent('home')} />
        <ButtonDashboard text="Voir les vidéos" onClick={() => setSelectedComponent('videos')} />
        <ButtonDashboard text="Voir les commentaires" onClick={() => setSelectedComponent('comments')} />
      </div>

      {renderSelectedComponent()}
    </div>
  );
};

export default UserPage;
