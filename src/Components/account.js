// src/components/Account.js
import React, { useState } from 'react';

const Account = () => {
  const initialUserData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
  };

  const [userData, setUserData] = useState(initialUserData);

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const updateProfile = () => {
    console.log('Mise à jour du profil');
  };

  const deactivateAccount = () => {
    console.log('Désactivation du compte');
  };

  const deleteAccount = () => {
    console.log('Suppression du compte');
  };

  return (
    <div className="account-container min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Informations du compte
        </h1>
        <form>
          <label className="block mb-4">
            <span className="text-gray-700 block text-center">Prénom</span>
            <input
              type="text"
              name="firstName"
              className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={userData.firstName}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700 block text-center">Nom</span>
            <input
              type="text"
              name="lastName"
              className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={userData.lastName}
              onChange={handleChange}
            />
          </label>
          <label className="block mb-6">
            <span className="text-gray-700 block text-center">Email</span>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full rounded-md bg-gray-100 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              value={userData.email}
              onChange={handleChange}
            />
          </label>
          <div className="flex justify-between">
            <button type="button" onClick={updateProfile} className="button">
              Mettre à jour le profil
            </button>
            <button type="button" onClick={deactivateAccount} className="button" >
              Désactiver le compte
            </button>
            <button type="button" onClick={deleteAccount} className="button">
              Supprimer le compte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Account;
