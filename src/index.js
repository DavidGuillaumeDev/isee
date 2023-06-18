import React from "react";
import ReactDOM from "react-dom";
import "./Styles/index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Containers/navBar";
import Home from "./Containers/home";
import VideoPage from "./Containers/videoPage";
import Account from "./Components/account";
import DashboardAdmin from "./Containers/dashboardAdmin";
import SearchResult from "./Containers/searchResult";
import TrendingPage from "./Containers/trendingPage";
import UserDashboard from "./Containers/userDashboard";
import VideoDetails from "./Containers/videoDétails";
import AddVideo from "./Containers/addVideo";
import UserPage from "./Containers/userPage";
import UpdateUser from "./Containers/updateUser";
import AideContact from "./Containers/aideContact";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/informations-du-compte" element={<Account />} />
        <Route path="/dashboard-admin" element={<DashboardAdmin />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/tendances" element={<TrendingPage />} />
        <Route path="/dashboard-user" element={<UserDashboard />} />
        <Route path="/video-details/:videoId" element={<VideoDetails />} />
        <Route path="/add-video" element={<AddVideo />} />
        <Route path="/upd-user/:userId" element={<UpdateUser />} />
        <Route path="/aide-contact" element={<AideContact />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
