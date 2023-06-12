import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Containers/navBar';
import Home from './Containers/home';
import VideoPage from './Containers/videoPage';
import Account from './Components/account';
import DashboardAdmin from './Containers/dashboardAdmin';
import SearchResult from './Containers/searchResult';
import TrendingPage from './Containers/trendingPage';
import UserDashboard from './Containers/userDashboard';


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
        <Route path="/informations-du-compte" element={<Account />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/search/:query" element={<SearchResult/>} />
        <Route path="/tendances" element={<TrendingPage />} />
        <Route path="/dashboard-user" element={<UserDashboard />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
