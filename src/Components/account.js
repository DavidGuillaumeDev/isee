import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import {
  getMe,
  GetUserIdButton,
  updateProfile,
  deactivateAccount,
  deleteAccount,
} from "../Api/usersApi";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const [userData, setUserData] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilPicture, setProfilPicture] = useState("");
  const userId = GetUserIdButton();
  const navigate = useNavigate();
  document.title="Profil"

  const handleSwitchChange = (checked) => {
    setUserData({ ...userData, darkMode: checked });
  };

  const updateUser = (username, password, profilePicture) => {
    updateProfile(userId, username, password, profilePicture);
    navigate("/", { replace: true });
    window.location.reload();
    // Effectuez ici votre logique de mise à jour du profil
  };

  const fetchAccountData = async () => {
    try {
      const user = await getMe(); // Utilisez la fonction getMe pour récupérer les informations du compte
      setUserData(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, []);

  const desactivateAccount = () => {
    const confirmDesactivate = window.confirm("Êtes-vous sûr de vouloir désactiver votre compte ?");
  
    if (confirmDesactivate) {
      try {
        deactivateAccount(userId);
        navigate("/", { replace: true });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  const deleteUserAccount = async (userId) => {
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?");
  
    if (confirmDelete) {
      try {
        await deleteAccount(userId);
        navigate("/", { replace: true });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  return (
    <div className=" account-container min-h-screen bg-gray-200 p-8 mt-20">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold mb-8 text-indigo-600 text-center border-b-2 pb-2">
          Informations du compte
        </h1>
        <label className="block mb-6">
          <span className="text-gray-700">Image de profil</span>
          <input
            type="file"
            name="profilPicture"
            className="mt-1 block w-full text-lg bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => setProfilPicture(e.target.files[0])}
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Pseudo</span>

          <input
            name="pseudo"
            placeholder={userData.name}
            className="mt-1 block w-full h-12 text-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Email</span>
          <p
            type="email"
            name="email"
            className="mt-1 block items-center justify-center w-full h-12 text-lg rounded-md bg-gray-100 shadow-sm"
            value={userData.email}
          >
            {userData.email}
          </p>
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Mot de passe</span>
          <input
            type="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            className="mt-1 block w-full h-12 text-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={userData.password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => updateUser(username, password, profilPicture)}
            className="button bg-indigo-500 text-white w-full h-12 rounded-md"
          >
            Mettre à jour le profil
          </button>
          <button
            type="button"
            onClick={() => desactivateAccount(userId)}
            className="button bg-yellow-500 text-white w-full h-12 rounded-md"
          >
            Désactiver le compte
          </button>
          <button
            type="button"
            onClick={() => deleteUserAccount(userId)}
            className="button bg-red-500 text-white w-full h-12 rounded-md"
          >
            Supprimer le compte
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
