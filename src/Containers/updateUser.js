import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import {
  getMe,
  GetUserIdButton,
  updateProfile,
  deactivateAccount,
  deleteAccount,
  getUserById,
} from "../Api/usersApi";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const [userData, setUserData] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [verifPassword, setVerifPassword] = useState("");
  const [profilPicture, setProfilPicture] = useState("");
  const navigate = useNavigate();

  const { userId } = useParams();

  const handleSwitchChange = (checked) => {
    setUserData({ ...userData, darkMode: checked });
  };

  const updateUser = (username, newPassword, profilPicture) => {
    if(newPassword !== verifPassword){
      window.alert("Mot de passe différent")
    }
    else{
      updateProfile(userId, username, newPassword, profilPicture);
      navigate("/", { replace: true });
      window.location.reload();
    }
  
  };

  const fetchAccountData = async () => {
    try {
      const user = await getUserById(userId);
      setUserData(user.user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAccountData();
  }, [userId]);
  const desactivateAccount = () => {
    const confirmDesactivate = window.confirm("Êtes-vous sûr de vouloir désactiver votre compte ?");
  
    if (confirmDesactivate) {
      deactivateAccount(userId);
      navigate("/", { replace: true });
      window.location.reload();
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
    <div className="font-mono account-container min-h-screen bg-gray-200 p-8 mt-20">
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
          <span className="text-gray-700">Nouveau mot de passe</span>
          <input
            type="password"
            name="newPassword"
            placeholder="Entrez votre nouveau mot de passe"
            className="mt-1 block w-full h-12 text-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Vérification du mot de passe</span>
          <input
            type="password"
            name="verifPassword"
            placeholder="Vérifiez votre nouveau mot de passe"
            className="mt-1 block w-full h-12 text-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={verifPassword}
            onChange={(e) => setVerifPassword(e.target.value)}
          />
        </label>
        <label className="block mb-6 flex items-center">
          <span className="text-gray-700 mr-4">Mode sombre</span>
          <Switch
            onChange={handleSwitchChange}
            checked={userData.darkMode}
            uncheckedIcon={false}
            checkedIcon={false}
            height={20}
            width={48}
            handleDiameter={24}
          />
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => updateUser(username, newPassword, profilPicture)}
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

export default UpdateUser;
