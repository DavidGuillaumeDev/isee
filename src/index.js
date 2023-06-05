import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Containers/navBar';
import Home from './Containers/home';
import VideoPage from './Containers/videoPage';
import Account from './Components/account';
import DashboardAdmin from './Containers/dashboardAdmin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  
  <React.StrictMode>
      <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/:videoId" element={<VideoPage />} />
            <Route path="/informations-du-compte" element={<Account />} />
            <Route path="/dashboard-admin" element={<DashboardAdmin />} />
          </Routes>
      </Router>
    </React.StrictMode>
);

reportWebVitals();
