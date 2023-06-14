const urlApi = "http://localhost:3000/";

export const fetchUserVideos = async (userId) => {
  try {
    const response = await fetch(urlApi + `video/user/${userId}`);

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user videos");
  }
};

export const fetchSuggUserVideos = async (userId) => {
  try {
    const response = await fetch(urlApi + `video/user/${userId}/sugg`);

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user videos");
  }
};

export const fetchAllVideos = async () => {
  try {
    const response = await fetch(urlApi + `video/`);

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user videos");
  }
};

export const createVideo = async (
  userId,
  title,
  description,
  file,
  thumbnail,
  status
) => {
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("fileUrl", file);
  formData.append("thumbnail", thumbnail);
  formData.append("status", status);

  try {
    const response = await fetch(urlApi + "video/create", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to create video");
    }

    const data = await response.json();
    return data.video;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create video");
  }
};

export const updateVideo = (videoId, updatedData) => {
  return fetch(urlApi + `videos/${videoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      console.log(data); // Succès de la mise à jour de la vidéo
    })
    .catch((error) => {
      console.error(error.message); // Gestion de l'erreur de la requête
    });
};

export const blockVideo = (userId) => {
  console.log(userId)
  return fetch(`${urlApi}video/${userId}/block`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials:"include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      console.log(data); // Succès de blocage de la vidéo
    })
    .catch((error) => {
      console.error(error.message); // Gestion de l'erreur de la requête
    });
};

export const getVideoById = (videoId) => {
  return fetch(`${urlApi}video/${videoId}`)
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      console.log(data); // Données de la vidéo récupérées avec succès
      return data;
    })
    .catch((error) => {
      console.error(error.message); // Gestion de l'erreur de la requête
    });
};

export const fetchSearchVideos = async (search) => {
  try {
    const response = await fetch(urlApi + `utils/search/?query=${search}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch user videos");
  }
};

export const incrementViews = async (videoId) => {
  try {
    const response = await fetch(urlApi + `video/${videoId}/views`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to increment views");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
