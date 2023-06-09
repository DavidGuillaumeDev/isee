import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import DOMPurify from "dompurify";

const urlApi = "http://localhost:3000/";

const setJwtCookie = (token) => {
  // Définir la durée de validité du cookie à 1 heure
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000); // 1 heure en millisecondes

  Cookies.set("jwt", token, {
    expires: expirationDate,
    sameSite: "none",
    secure: true,
  });
  localStorage.setItem("jwt", token, {
    sameSite: "none",
    secure: true,
  });
};


export const GetUserIdButton = () => {
  const token = Cookies.get("jwt"); // Récupère le token depuis le cookie
  if (token) {
    const decodedToken = jwt_decode(token);
    const userId = decodedToken.userId;
    return userId;
  }
};

export const login = async (email, password) => {
  // Nettoyer les valeurs des champs email et password
  const sanitizedEmail = DOMPurify.sanitize(email);
  const sanitizedPassword = DOMPurify.sanitize(password);
  try {
    const response = await fetch(urlApi + "user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: sanitizedEmail,
        password: sanitizedPassword,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      setJwtCookie(data.token); // Appel de la fonction pour définir le cookie
      return data;
    } else if (response.status === 401) {
      throw new Error("Invalid email or password");
    } else {
      throw new Error("Failed to authenticate");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const logout = async () => {
  try {
    const response = await fetch(urlApi + "user/logout", {
      method: "POST",
      credentials: "include", // Inclure les cookies dans la requête
    });

    if (response.ok) {
      // Supprimer le cookie en utilisant js-cookie
      Cookies.remove("jwt", { sameSite: "none", secure: true });

      const data = await response.json();
      return data;
    } else {
      throw new Error("Logout failed");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await fetch(urlApi + "user/me", {
      method: "GET",
      credentials: "include", // Inclure les cookies dans la requête
    });

    if (!response.ok) {
      throw new Error("Request failed");
    }
    const user = await response.json();
    return user;
    // Faites quelque chose avec les données de l'utilisateur
  } catch (error) {
    console.error(error);
    // Gérez les erreurs de requête
  }
};

export const registerUser = async (name, email, password, profilPicture) => {
  const formData = new FormData();

  const sanitizedName = DOMPurify.sanitize(name);
  const sanitizedEmail = DOMPurify.sanitize(email);
  const sanitizedPassword = DOMPurify.sanitize(password);

  formData.append("name", sanitizedName);
  formData.append("email", sanitizedEmail);
  formData.append("password", sanitizedPassword);
  formData.append("profilPicture", profilPicture);

  try {
    const response = await fetch(urlApi + "user/register", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.message;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};


export const updateProfile = async (userId, name, password, profilePicture) => {
  const formData = new FormData();

  // Nettoyer les valeurs des champs name et password
  const sanitizedName = DOMPurify.sanitize(name);
  const sanitizedPassword = DOMPurify.sanitize(password);

  formData.append("name", sanitizedName);
  formData.append("password", sanitizedPassword);
  formData.append("profilPicture", profilePicture);

  try {
    const response = await fetch(urlApi + `user/${userId}`, {
      method: "PUT",
      body: formData,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deactivateAccount = async (userId) => {
  try {
    const response = await fetch(urlApi + `user/${userId}/deactivate`, {
      method: "PUT",
      credentials: "include", // Inclure les cookies dans la requête
      mode: "cors",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to deactivate user account: ${errorData.message}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async (userId) => {
  try {
    const response = await fetch(urlApi + `user/${userId}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user account");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${urlApi}user/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};
