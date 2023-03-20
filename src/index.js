import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './Containers/navBar';
import Home from './Containers/home';
import VideoPage from './Containers/videoPage';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video" element={<VideoPage />} />
        </Routes>
      </Router>
    </React.StrictMode>
);

reportWebVitals();