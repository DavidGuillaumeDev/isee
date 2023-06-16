import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiHome,
  FiTrendingUp,
  FiVideo,
  FiSettings,
  FiHelpCircle,
  FiBarChart2,
} from "react-icons/fi";
import youtubeIsee from "../Images/youtubeicon.png";
import { fetchSearchVideos } from "../Api/videoApi";
import AuthModal from "../Components/authModal";
import { logout, GetUserIdButton, getMe } from "../Api/usersApi";
import { checkAdminStatus } from "../Api/adminApi";
import DefaultPicture from "../Images/DefaultUser.png";

const NavBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState();
  const [isAdmina, setIsAdmin] = useState(false);
  const [pictureSrc, setPictureSrc] = useState();

  const navRef = useRef(null); // Ref pour la barre de navigation

  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSearch = async (query) => {
    try {
      await fetchSearchVideos(query);
    } catch (error) {
      console.error(error);
      // Gérez les erreurs de recherche
    }
  };
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(searchQuery);
      navigate(`/search/${searchQuery}`);
    }
  };
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
    window.location.reload();
  };

  const handleClickOutside = (event) => {
    // Vérifiez si la barre de navigation est ouverte et si le clic est en dehors de celle-ci
    if (
      showSidebar &&
      navRef.current &&
      !navRef.current.contains(event.target)
    ) {
      setShowSidebar(false); // Fermez la barre de navigation
    }
  };
  const loadPictureImage = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/images/pp/${userData.profilePicture}`
      );
      if (!response.ok) {
        // if HTTP-status is 404-599
        throw new Error(response.statusText);
      }
      setPictureSrc(
        `http://localhost:3000/images/pp/${userData.profilePicture}`
      );
    } catch (error) {
      console.error("No image found, setting to default");
      setPictureSrc(DefaultPicture);
    }
  };

  const fetchAccountData = async () => {
    try {
      const user = await getMe(); // Utilisez la fonction getMe pour récupérer les informations du compte
      setUserData(user);
    } catch (error) {
      console.error(error);
    }
  };
  const isAdmin = async () => {
    try {
      const isAdmin = await checkAdminStatus();
      setIsAdmin(isAdmin);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isAdmin();
    fetchAccountData();
    loadPictureImage();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Supprimez l'écouteur d'événement au démontage pour éviter les fuites de mémoire
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSidebar]);

  useEffect(() => {
    const userIdFromToken = GetUserIdButton();

    if (userIdFromToken) {
      setUserId(userIdFromToken);
      setIsConnected(true);
    }
  }, []);

  return (
    <nav className="font-mono fixed top-0 w-full flex items-center bg-white justify-between flex-wrap p-6 shadow-md">
      <div className="flex items-center flex-shrink-0 text-balck">
        <FiMenu
          className="text-black text-3xl mr-2 cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <Link
          to="/"
          className="font-semibold text-xl tracking-tight font-serif"
        >
          <div className="flex flex-row items-center h-10">
            <img src={youtubeIsee} alt="logoIsee" className="h-full" />
            iSee
          </div>
        </Link>
      </div>
      <div className="src-box">
        <input
          type="text"
          placeholder=" "
          value={searchQuery}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button type="reset"></button>
      </div>
      <div className="flex items-center">
        <div className="menu-container relative">
          <img
            src={pictureSrc}
            alt="Profil"
            className="h-12 w-12 rounded-full cursor-pointer"
          />
          <div className="dropdown-menu">
            {!isConnected && (
              <>
                <button onClick={openModal} className="dropdown-item">
                  Connexion
                </button>
              </>
            )}
            {isConnected && (
              <>
                <button onClick={handleLogout} className="dropdown-item">
                  Déconnexion
                </button>

                <Link to="/informations-du-compte" className="dropdown-item">
                  Informations du compte
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div
        ref={navRef} // Attachez la ref à ce div
        className={`fixed left-0 bg-white top-16 w-64 p-6 overflow-y-auto transform transition-all duration-300 ease-in-out opacity-90 shadow-lg -mr-2 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <div className="flex items-center mb-6">
          <FiHome className="text-black text-xl mr-3" />
          <Link to="/" className="text-black text-xl">
            Accueil
          </Link>
        </div>
        <div className="flex items-center mb-6">
          <FiTrendingUp className="text-black text-xl mr-3" />
          <Link to="/tendances" className="text-black text-xl">
            Tendances
          </Link>
        </div>
        {isConnected && (
          <div className="flex items-center mb-6">
            <FiVideo className="text-black text-xl mr-3" />
            <Link to="/dashboard-user" className="text-black text-xl">
              Vos Vidéos
            </Link>
          </div>
        )}
        {isAdmina && (
          <div className="flex items-center mb-6">
            <FiBarChart2 className="text-black text-xl mr-3" />
            <Link to="/dashboard-admin" className="text-black text-xl">
              Tableau de bord admin
            </Link>
          </div>
        )}
        <div className="absolute bottom-0 left-0 mb-6 p-6 w-full">
          <div className="flex items-center mb-6">
            <FiSettings className="text-black text-xl mr-3" />
            <Link to="/parametres" className="text-black text-xl">
              Paramètres
            </Link>
          </div>
          <div className="flex items-center">
            <FiHelpCircle className="text-black text-xl mr-3" />
            <Link to="/aide-contact" className="text-black text-xl">
              Aide/Contact
            </Link>
          </div>
        </div>
        <AuthModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Auth Modal"
        />
      </div>
    </nav>
  );
};

export default NavBar;
