import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faUserMinus } from "@fortawesome/free-solid-svg-icons";

const UserTable = ({ users }) => {

 // Generate user
 const generateFakeUsers = (count) => {
  const usersTemp = [];

  for (let i = 1; i <= count; i++) {
    const user = {
      id: i,
      username: `Utilisateur ${i}`,
      email: `utilisateur${i}@example.com`
    };

    usersTemp.push(user);
  }

  return usersTemp;
};

users = generateFakeUsers(10); // Génère 10 faux utilisateurs
 // Generate user



    const generateActionButtons = (user) => {
        const actions = [
            { label: 'Modifier', icon: faUserEdit, classes: 'mr-2 text-blue-600 hover:text-blue-900 border border-blue-600 hover:border-blue-900 rounded-md px-3 py-1 m-1 hover:bg-blue-200' },
            { label: 'Supprimer', icon: faUserMinus, classes: 'text-red-600 hover:text-red-900 border border-red-600 hover:border-red-900 rounded-md px-3 py-1 m-1 hover:bg-red-200' }
        ];

        return actions.map(action => (
            <button className={action.classes} key={action.label}>
                <FontAwesomeIcon icon={action.icon} /> {action.label}
            </button>
        ));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <table className="table-fixed font-roboto">
                <thead>
                    <tr className="text-center">
                        <th className="col-id">Id</th>
                        <th className="col-username">Pseudo</th>
                        <th className="col-email">Email</th>
                        <th className="col-actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="text-center">{user.id}</td>
                            <td className="text-center">{user.username}</td>
                            <td className="text-center">{user.email}</td>
                            <td className="w-2/5 text-right">
                                {generateActionButtons(user)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
