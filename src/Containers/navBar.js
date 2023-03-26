import React from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiHome, FiTrendingUp, FiVideo, FiSettings, FiHelpCircle, FiUser } from "react-icons/fi";

const NavBar = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);
  const [isConnected, setIsConnected] = React.useState(true);

  const disconnect = () => {
    setIsConnected(false);
  };

  const connect = () => {
    setIsConnected(true);
  };


  return (
    <nav className="fixed top-0 w-full flex items-center justify-between flex-wrap bg-gray-900 p-6">
      <div className="flex items-center flex-shrink-0 text-white">
        <FiMenu
          className="text-white text-2xl mr-2 cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <Link to="/" className="font-semibold text-xl tracking-tight">
          iSee
        </Link>
      </div>
      <div className="src-box">
        <input type="text" placeholder="  " />
        <button type="reset"></button>
      </div>
      <div className="flex items-center">
        <div className="menu-container relative">
          <FiUser className="text-white text-2xl ml-4 cursor-pointer" />
          <div className="dropdown-menu">
            {!isConnected && 
              <Link to="/connexion" className="dropdown-item">
                Connexion
              </Link> 
            }
            {isConnected && (
              <>
                <button onClick={disconnect} className="dropdown-item">
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
        className={`fixed left-0 top-16 bg-gray-900 w-64 p-6 overflow-y-auto transform transition-all duration-300 ease-in-out opacity-90 ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ height: "calc(100vh - 4rem)" }}
      >
          <div className="flex items-center mb-6">
            <FiHome className="text-white text-xl mr-3" />
            <Link to="/" className="text-white text-xl">
              Accueil
            </Link>
          </div> 
          <div className="flex items-center mb-6">
            <FiTrendingUp className="text-white text-xl mr-3" />
            <Link to="/tendances" className="text-white text-xl">
              Tendances {/* Plus de nb de vues dans les 2 derniers jours */}
            </Link>
          </div>
          <div className="flex items-center mb-6">
            <FiVideo className="text-white text-xl mr-3" />
            <Link to="/vos-videos" className="text-white text-xl">
              Vos Vidéos {/* Liste des vidéos upload par l'utilisateur connecté / Doit s'afficher si un utilisateur est connecté*/}
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 mb-6 p-6 w-full">
            <div className="flex items-center mb-6">
              <FiSettings className="text-white text-xl mr-3" />
              <Link to="/parametres" className="text-white text-xl">
                Paramètres
              </Link>
            </div>
            <div className="flex items-center">
              <FiHelpCircle className="text-white text-xl mr-3" />
              <Link to="/aide-contact" className="text-white text-xl">
                Aide/Contact
              </Link>
            </div>
          </div>
        </div>
    </nav>
    

  );
};

export default NavBar;