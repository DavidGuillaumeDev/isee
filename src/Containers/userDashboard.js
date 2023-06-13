import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
import CardDashboard from '../Components/DashboardAdmin/cardDashboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faClock, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";



const UserDashboard = () => {
  const lastVideoViews = 2500;
  const lastVideoComments = 1050;

  const videos = [
    {
      id: 1,
      title: "Parc de la colline aux oiseaux",
      state: "Public"
    },
    {
      id: 2,
      title: "Parc de la colline aux oiseaux",
      state: "Privé"
    },
    {
      id: 3,
      title: "Parc de la colline aux oiseaux",
      state: "Non Repertorié"
    },
    {
      id: 4,
      title: "Parc de la colline aux oiseaux",
      state: "Public"
    }
  ];

  const getClassFromState = (state) => {
    switch (state) {
        case 'Public':
            return 'bg-green-500 text-white rounded-2xl px-2 py-1';
        case 'Privé':
            return 'bg-red-500 text-white rounded-2xl px-2 py-1';
        case 'Non Repertorié':
            return 'bg-orange-500 text-white rounded-2xl px-2 py-1';
        default:
            return '';
    }
  };

  const generateActionButtons = (video) => {
    const actions = [
      { label: 'Détails', classes: 'mr-2 text-blue-600 hover:text-blue-900 border border-blue-600 hover:border-blue-900 rounded-md px-3 py-1 m-1 hover:bg-blue-200', icon: faUserCheck },
      { label: 'Public', classes: 'mr-2 text-green-600 hover:text-green-900 border border-green-600 hover:border-green-900 rounded-md px-3 py-1 m-1 hover:bg-green-200', icon: faUserCheck },
      { label: 'Privé', classes: 'text-red-600 hover:text-red-900 border border-red-600 hover:border-red-900 rounded-md px-3 py-1 m-1 hover:bg-red-200', icon: faLock },
      { label: 'Non Repertorié', classes: 'text-orange-600 hover:text-orange-900 border border-orange-600 hover:border-orange-900 rounded-md px-3 py-1 m-1 hover:bg-orange-200', icon: faClock },
      { label: 'Supprimer', classes: 'text-red-600 hover:text-red-900 border border-red-600 hover:border-red-900 rounded-md px-3 py-1 m-1 hover:bg-red-200', icon: faTrashAlt },
    ];

    return actions
    .filter(action => action.label !== video.state)
    .map(action => (
      action.label === 'Détails' ? (
        <Link to={`/video-details/${video.id}`}>
          <button className={action.classes} key={action.label}>
            <FontAwesomeIcon icon={action.icon} className="mr-1" />
            {action.label}
          </button>
        </Link>
      ) : (
        <button className={action.classes} key={action.label}>
          <FontAwesomeIcon icon={action.icon} className="mr-1" />
          {action.label}
        </button>
      )
    ));
  };


  return (
    <div className="dashboard-admin p-8 mt-16">
      <h1 className="text-4xl font-semibold mb-6 text-gray-800 text-center font-mono">
        Bienvenue sur votre tableau de bord créateur de contenu
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <CardDashboard text="Nombre de vues sur votre dernière vidéo" stat={lastVideoViews} />
        <CardDashboard text="Nombre de commentaires sur votre dernière vidéo" stat={lastVideoComments} />
        <CardDashboard text="Lien vers votre dernière vidéo" stat={<Link to={`/video`} className="block underline-none">Cliquez ici</Link>} />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
      <table class="table-fixed font-roboto">
        <thead>
          <tr class="text-center">
            <th class="col-id">Id</th>
            <th class="col-title">Titre de la vidéo</th>
            <th class="col-status">Etat</th>
            <th class="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
                <td  class="text-center">{video.id}</td>
                <td  class="text-center">{video.title}</td>
                <td className="p-2 text-center" /* onClick={Changer l'état en celui cliqué et refresh} */>
                    <span className={getClassFromState(video.state)}>
                        {video.state}
                    </span>
                </td>
                <td class=" w-2/5 text-right">
                    {generateActionButtons(video)}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default UserDashboard;
