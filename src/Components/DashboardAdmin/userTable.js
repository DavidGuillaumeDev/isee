import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { deleteAccount } from "../../Api/usersApi";

const UserTable = ({ users }) => {
  const handleDeleteUser = (userId) => {
    deleteAccount(userId)
      .then(() => {
        setUsersData((prevUsersData) =>
          prevUsersData.filter((user) => user._id !== userId)
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const generateActionButtons = (user) => {
    const actions = [
      {
        label: "Modifier",
        icon: faUserEdit,
        classes:
          "mr-2 text-blue-600 hover:text-blue-900 border border-blue-600 hover:border-blue-900 rounded-md px-3 py-1 m-1 hover:bg-blue-200",
      },
      {
        label: "Supprimer",
        icon: faUserMinus,
        classes:
          "text-red-600 hover:text-red-900 border border-red-600 hover:border-red-900 rounded-md px-3 py-1 m-1 hover:bg-red-200",
        onClick: () => handleDeleteUser(user._id),
      },
    ];

    return actions.map((action) => (
      <button
        className={action.classes}
        key={action.label}
        onClick={action.onClick}
      >
        <FontAwesomeIcon icon={action.icon} /> {action.label}
      </button>
    ));
  };

  const [usersData, setUsersData] = useState(users);

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
          {usersData.map((user) => (
            <tr key={user._id}>
              <td className="text-center">{user._id}</td>
              <td className="text-center">{user.name}</td>
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
