import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';


const DashboardAdmin = () => {
  const [filter, setFilter] = useState('week');
  const [displayType, setDisplayType] = useState('numbers');


  const users = 2500;
  const videos = 1050;
  const totalSize = 250;

  const generateTableData = () => {
    const data = [];
    const timeRange = filter === 'day' ? 7 : filter === 'week' ? 4 : 12;
    const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  
    for (let i = 0; i < timeRange; i++) {
      data.push({
        day:
          filter === 'day'
            ? days[i]
            : filter === 'week'
            ? `Semaine ${i + 1}`
            : months[i],
        newUsers: Math.floor(Math.random() * 100),
        newVideos: Math.floor(Math.random() * 50),
      });
    }
  
    return data;
  };

  const tableData = generateTableData();

  const formatXAxis = (tickItem) => {
    if (filter === 'day') {
      return tickItem;
    } else if (filter === 'week') {
      return `Semaine ${tickItem}`;
    } else {
      return tickItem;
    }
  };

  const CustomizedAxisTick = (props) => {
    const { x, y, payload } = props;
    const value = formatXAxis(payload.value);
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
          {value}
        </text>
      </g>
    );
  };
  

  

  return (
    <div className="dashboard-admin p-8 mt-16">
      <h1 className="text-4xl font-semibold mb-6 text-gray-800 text-center font-roboto">
        Tableau de bord administrateur
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Utilisateurs enregistrés
          </h2>
          <p className="text-lg text-gray-700">{users}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Vidéos en ligne
          </h2>
          <p className="text-lg text-gray-700">{videos}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Taille totale des vidéos
          </h2>
          <p className="text-lg text-gray-700">{totalSize} Go</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Évolution</h2>
        <div className="mb-4">
          <label htmlFor="filter">Période: </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="day">Jour</option>
            <option value="week">Semaine</option>
            <option value="month">Mois</option>
          </select>

          <label htmlFor="displayType" className="ml-4">Affichage: </label>
          <select
            id="displayType"
            value={displayType}
            onChange={(e) => setDisplayType(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="numbers">Chiffres</option>
            <option value="lineChart">Graphique en ligne</option>
            <option value="barChart">Graphique à barres</option>
          </select>
        </div>

        {displayType === 'numbers' && (
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center">Période</th>
                <th className="px-4 py-2 text-center">Nouveaux utilisateurs</th>
                <th className="px-4 py-2 text-center">Nouvelles vidéos</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className="px-4 py-2 text-center">{data.day}</td>
                  <td className="px-4 py-2 text-center">{data.newUsers}</td>
                  <td className="px-4 py-2 text-center">{data.newVideos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {displayType === 'lineChart' && (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={tableData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={<CustomizedAxisTick />} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="newUsers" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="newVideos" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        )}

        {displayType === 'barChart' && (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={tableData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={<CustomizedAxisTick />} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="newUsers" fill="#8884d8" />
              <Bar dataKey="newVideos" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;