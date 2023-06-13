import React, { useState,useEffect } from 'react';
import Switch from 'react-switch';
import { getMe } from '../Api/usersApi';

const Account = () => {
  const initialUserData = {
    pseudo: '',
    email: '',
    password: '',
    darkMode: false,
    profilePicture: ''
  };

  const [userData, setUserData] = useState(initialUserData);

  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setUserData({ ...userData, [event.target.name]: value });
  };

  const handleSwitchChange = (checked) => {
    setUserData({ ...userData, darkMode: checked });
  };

  const updateProfile = () => {
    console.log('Mise à jour du profil');
    // Effectuez ici votre logique de mise à jour du profil
  };

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
  }, []);


  const deactivateAccount = () => {
    console.log('Désactivation du compte');
  };

  const deleteAccount = () => {
    console.log('Suppression du compte');
  };

  return (
    <div className="font-mono account-container min-h-screen bg-gray-200 p-8 mt-20">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-semibold mb-8 text-indigo-600 text-center border-b-2 pb-2">
          Informations du compte
        </h1>
        <form>
          <label className="block mb-6">
            <span className="text-gray-700">Pseudo</span>
            <input
              type="text"
              name="pseudo"
              placeholder="Entrez votre pseudo"
              className="mt-1 block w-full h-12 text-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={userData.name}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              name="email"
              placeholder="Entrez votre email"
              className="mt-1 block w-full h-12 text-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={userData.email}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700">Mot de passe</span>
            <input
              type="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              className="mt-1 block w-full h-12 text-lg rounded-md bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={userData.password}
              onChange={handleChange}
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
            <button type="button" onClick={updateProfile} className="button bg-indigo-500 text-white w-full h-12 rounded-md">
              Mettre à jour le profil
            </button>
            <button type="button" onClick={deactivateAccount} className="button bg-yellow-500 text-white w-full h-12 rounded-md">
              Désactiver le compte
            </button>
            <button type="button" onClick={deleteAccount} className="button bg-red-500 text-white w-full h-12 rounded-md">
              Supprimer le compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Account;
