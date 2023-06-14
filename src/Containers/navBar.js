import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiHome,
  FiTrendingUp,
  FiVideo,
  FiSettings,
  FiHelpCircle,
  FiUser,
  FiBarChart2,
} from "react-icons/fi";
import youtubeIsee from "../Images/youtubeicon.png";
import ProfilPicture from "../Images/logoSupinfo.jpg";
import { fetchSearchVideos } from "../Api/videoApi";
import AuthModal from "../Components/authModal";
import { logout,GetUserIdButton,getMe } from "../Api/usersApi";

const NavBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState('');
  const [userData, setUserData]= useState();

  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    console.log("openModal");
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSearch = async (query) => {
    try {
      const searchResults = await fetchSearchVideos(query);
      console.log("Search", searchResults);
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
  const handleLogout=() =>{
    logout()
    navigate('/', { replace: true });
    window.location.reload();
  }
  
  
  const fetchAccountData = async () => {
    try {
      const user = await getMe(); // Utilisez la fonction getMe pour récupérer les informations du compte
      setUserData(user);
      console.log(user.name)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAccountData();
    console.log(userData)
  }, []);


  useEffect(() => {
  
    const userIdFromToken = GetUserIdButton();
  
    if (userIdFromToken) {
      setUserId(userIdFromToken);
      setIsConnected(true)
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
            src={ProfilPicture}
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
        {/* {user.isAdmin && (
          <div className="flex items-center mb-6">
            <FiBarChart2 className="text-black text-xl mr-3" />
            <Link to="/dashboard-admin" className="text-black text-xl">
              Tableau de bord admin
            </Link>
          </div>
        )} */}
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
