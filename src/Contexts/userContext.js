import { createContext } from 'react';

const UserContext = createContext({
  isConnected: true,
  user: {
    id: 1,
    email: "test@test.com",
    password : "test",
    name: "test",
    isActive: true,
    isAdmin: true
  },
  updateUser: () => {},
  deconnectUser: () => {
    UserContext.isConnected = false
  },
});

export default UserContext;