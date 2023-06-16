import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import {
  fetchWeeklyDashboard,
  fetchMonthlyDashboard,
  fetchDailyDashboard,
} from "../../Api/adminApi";

const HomeDashboard = () => {
  const [filter, setFilter] = useState("week");
  const [displayType, setDisplayType] = useState("numbers");
  const [tableData, setTableData] = useState([]);
  const [chartData, setChartData] = useState([]);

  //   const timeRange = filter === "day" ? 7 : filter === "week" ? 4 : 12;
  //   const days = [
  //     "Lundi",
  //     "Mardi",
  //     "Mercredi",
  //     "Jeudi",
  //     "Vendredi",
  //     "Samedi",
  //     "Dimanche",
  //   ];
  //   const months = [
  //     "Janvier",
  //     "Février",
  //     "Mars",
  //     "Avril",
  //     "Mai",
  //     "Juin",
  //     "Juillet",
  //     "Août",
  //     "Septembre",
  //     "Octobre",
  //     "Novembre",
  //     "Décembre",
  //   ];

  //   for (let i = 0; i < timeRange; i++) {
  //     data.push({
  //       day:
  //         filter === "day"
  //           ? days[i]
  //           : filter === "week"
  //           ? `Semaine ${i + 1}`
  //           : months[i],
  //       newUsers: Math.floor(Math.random() * 100),
  //       newVideos: Math.floor(Math.random() * 50),
  //     });
  //   }

  //   return data;
  // };

  useEffect(() => {
    if (displayType === "numbers") {
      // Récupérer les données du tableau en fonction du filtre
      if (filter === "day") {
        fetchDailyDashboard()
          .then((data) => {
            setTableData(data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (filter === "week") {
        fetchWeeklyDashboard()
          .then((data) => {
            setTableData(data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (filter === "month") {
        fetchMonthlyDashboard()
          .then((data) => {
            setTableData(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } else if (displayType === "lineChart") {
      // Récupérer les données du graphique en fonction du filtre
      if (filter === "day") {
        fetchDailyDashboard()
          .then((data) => {
            setChartData(data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (filter === "week") {
        fetchWeeklyDashboard()
          .then((data) => {
            setChartData(data);
          })
          .catch((error) => {
            console.error(error);
          });
      } else if (filter === "month") {
        fetchMonthlyDashboard()
          .then((data) => {
            setChartData(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, [filter, displayType]);

  // const tableData = generateTableData();
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };
  const formatXAxis = (tickItem) => {
    if (filter === "day") {
      return tickItem;
    } else if (filter === "week") {
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
        <text
          x={0}
          y={0}
          dy={16}
          textAnchor="end"
          fill="#666"
          transform="rotate(-35)"
        >
          {value}
        </text>
      </g>
    );
  };

  return (
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

        <label htmlFor="displayType" className="ml-4">
          Affichage:{" "}
        </label>
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
      {displayType === "numbers" && (
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
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="px-4 py-2 text-center">
                  {filter === "day"
                    ? data.day
                    : filter === "week"
                    ? `Semaine du ${formatDate(data.startDate )} au ${formatDate(data.endDate)}`
                    : data.month}
                </td>
                <td className="px-4 py-2 text-center">{data.totalUsers}</td>
                <td className="px-4 py-2 text-center">{data.totalVideos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {displayType === "lineChart" && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={<CustomizedAxisTick />} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="totalUsers"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="totalVideos" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      )}

      {displayType === "barChart" && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={<CustomizedAxisTick />} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalUsers" fill="#8884d8" />
            <Bar dataKey="totalVideos" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default HomeDashboard;
