import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
import CardDashboard from '../Components/cardDashboard';


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

  const generateActionButtons = (state) => {
    const actions = [
        { label: 'Détails', classes: 'border border-blue-300 text-blue-300 rounded-2xl px-1 py-0.5 mr-2' },
        { label: 'Public', classes: 'border border-green-500 text-green-500 rounded-2xl px-1 py-0.5 mr-2' },
        { label: 'Privé', classes: 'border border-red-500 text-red-500 rounded-2xl px-1 py-0.5 mr-2' },
        { label: 'Non Repertorié', classes: 'border border-orange-500 text-orange-500 rounded-2xl px-1 py-0.5 mr-2' },
        { label: 'Supprimer', classes: 'border border-red-500 text-red-500 rounded-2xl px-1 py-0.5' },
    ];

    return actions
        .filter(action => action.label !== state)
        .map(action => (
            <button className={action.classes} key={action.label}>
                {action.label}
            </button>
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
      <table class="table-fixed text-center font-roboto">
        <thead>
          <tr>
            <th class="col-id">Id</th>
            <th class="col-title">Titre de la vidéo</th>
            <th class="col-status">Etat</th>
            <th class="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video) => (
                        <tr key={video.id}>
                            <td>{video.id}</td>
                            <td>{video.title}</td>
                            <td className="p-2">
                                <span className={getClassFromState(video.state)}>
                                    {video.state}
                                </span>
                            </td>
                            <td>
                                {generateActionButtons(video.state)}
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