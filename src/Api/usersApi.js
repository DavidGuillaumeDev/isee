import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';


const urlApi = "http://localhost:3000/";

const setJwtCookie = (token) => {
  Cookies.set('jwt', token, { sameSite: 'none', secure: true });
};
export const GetUserIdButton = () => {
    const token = Cookies.get('jwt'); // Récupère le token depuis le cookie
    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      console.log(userId); // Affiche l'identifiant de l'utilisateur dans la console
      return userId
    }
}

export const login = async (email, password) => {
  try {
    const response = await fetch(urlApi + 'user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setJwtCookie(data.token); // Appel de la fonction pour définir le cookie
      console.log(data.token)
      return data;
    } else {
      throw new Error('Authentication failed');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const logout = async () => {
  console.log(urlApi + 'user/logout')
  try {
    const response = await fetch(urlApi + 'user/logout', {
      method: 'POST',
      credentials: 'include', // Inclure les cookies dans la requête
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Logout failed');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMe = async ()=>{    try {
      const response = await fetch(urlApi + 'user/me', {
        method: 'GET',
        credentials: 'include', // Inclure les cookies dans la requête
      });
  
      if (!response.ok) {
        throw new Error('Request failed');
      }
  
      const user = await response.json();
      console.log(user);
      return user
      // Faites quelque chose avec les données de l'utilisateur
  
    } catch (error) {
      console.error(error);
      // Gérez les erreurs de requête
    }
  };
  
