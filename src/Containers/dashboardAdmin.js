import React, { useEffect, useState } from "react";
import CardDashboard from "../Components/DashboardAdmin/cardDashboard";
import ButtonDashboard from "../Components/DashboardAdmin/buttonDashboard";
import VideoTable from "../Components/DashboardAdmin/videoTable";
import UserTable from "../Components/DashboardAdmin/userTable";
import HomeDashboard from "../Components/DashboardAdmin/homeDashboard";
import { getDashboard } from "../Api/adminApi";
const DashboardAdmin = () => {
  const [selectedComponent, setSelectedComponent] = useState("home");
  const [data, setData] = useState([]);

  useEffect(() => {
    getDashboard()
      .then((getData) => {
        setData(getData); // Met à jour les vidéos avec les données récupérées de l'API
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  document.title = "Dasboard administrateur";


  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "home":
        return <HomeDashboard />;
      case "videos":
        return <VideoTable videos={data.videos} />;
      case "users":
        return <UserTable users={data.users} />;
      default:
        return <HomeDashboard />;
    }
  };

  const totalSizeGB = (data.totalsize / 1000000000).toFixed(3); // Convertir en Go avec 2 décimales
  const totalSizeShort = totalSizeGB.substring(0, 7);

  return (
    <div className="dashboard-admin p-8 mt-16">
      <h1 className="text-4xl font-semibold mb-6 text-gray-800 text-center font-roboto">
        Tableau de bord administrateur
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <CardDashboard text="Utilisateurs enregistrés" stat={data.totalUsers} />
        <CardDashboard text="Vidéos en ligne" stat={data.totalVideos} />
        <CardDashboard
          text="Taille totale des vidéos"
          stat={`${totalSizeShort} Go`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <ButtonDashboard
          text="Voir l'Évolution"
          onClick={() => setSelectedComponent("home")}
        />
        <ButtonDashboard
          text="Voir les utilisateurs"
          onClick={() => setSelectedComponent("users")}
        />
        <ButtonDashboard
          text="Voir les vidéos"
          onClick={() => setSelectedComponent("videos")}
        />
      </div>

      {renderSelectedComponent()}
    </div>
  );
};

export default DashboardAdmin;
