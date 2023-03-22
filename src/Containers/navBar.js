import React from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiHome, FiTrendingUp, FiVideo, FiSettings, FiHelpCircle, FiUser } from "react-icons/fi";

const NavBar = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);

  return (
    <nav className="fixed top-0 w-full flex items-center justify-between flex-wrap bg-gray-900 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <FiMenu
          className="text-white text-2xl mr-2 cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <Link to="/" className="font-semibold text-xl tracking-tight">
          iSee
        </Link>
      </div>
      <div className="flex flex-grow items-center">
        <div className="flex-grow text-sm">
          <input
            className="bg-gray-800 focus:outline-none focus:shadow-outline rounded-lg py-2 px-4 block w-full appearance-none leading-normal text-white"
            type="text"
            placeholder="Rechercher"
          />
        </div>
        <div className="flex items-center">
          <FiUser className="text-white text-2xl ml-4" />
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
              Tendances
            </Link>
          </div>
          <div className="flex items-center mb-6">
            <FiVideo className="text-white text-xl mr-3" />
            <Link to="/vos-videos" className="text-white text-xl">
              Vos Vidéos
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