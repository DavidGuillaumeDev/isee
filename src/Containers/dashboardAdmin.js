import React, { useState } from 'react';
import CardDashboard from '../Components/DashboardAdmin/cardDashboard';
import ButtonDashboard from '../Components/DashboardAdmin/buttonDashboard';
import VideoTable from '../Components/DashboardAdmin/videoTable';
import UserTable from '../Components/DashboardAdmin/userTable';
import HomeDashboard from '../Components/DashboardAdmin/homeDashboard';

const DashboardAdmin = () => {
  const [selectedComponent, setSelectedComponent] = useState('home');
  
  const users = 2500;
  const videos = 1050;
  const totalSize = 250;

  const renderSelectedComponent = () => {
    switch(selectedComponent) {
      case 'home':
        return <HomeDashboard />;
      case 'videos':
        return <VideoTable />;
      case 'users':
        return <UserTable />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="dashboard-admin p-8 mt-16">
      <h1 className="text-4xl font-semibold mb-6 text-gray-800 text-center font-roboto">
        Tableau de bord administrateur
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <CardDashboard text="Utilisateurs enregistrés" stat={users} />
        <CardDashboard text="Vidéos en ligne" stat={videos} />
        <CardDashboard text="Taille totale des vidéos" stat={`${totalSize} Go`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <ButtonDashboard text="Voir l'Évolution" onClick={() => setSelectedComponent('home')} />
        <ButtonDashboard text="Voir les utilisateurs" onClick={() => setSelectedComponent('users')} />
        <ButtonDashboard text="Voir les vidéos" onClick={() => setSelectedComponent('videos')} />
      </div>

      {renderSelectedComponent()}
    </div>
  );
};

export default DashboardAdmin;
