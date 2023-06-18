import DOMPurify from "dompurify";

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

  // Nettoyer les valeurs des champs title et description
  const sanitizedTitle = DOMPurify.sanitize(title);
  const sanitizedDescription = DOMPurify.sanitize(description);
  formData.append("title", sanitizedTitle);
  formData.append("description", sanitizedDescription);
  formData.append("fileUrl", file);
  formData.append("thumbnail", thumbnail);
  formData.append("status", status);

  try {
    const response = await fetch(urlApi + "video/create", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      // Récupérer le message d'erreur retourné par l'API
      const errorData = await response.json();
      const statusCode = response.status;
      console.log(statusCode, errorData.message);
      throw new Error(
        `Failed to create video. Status: ${statusCode}. Error: ${errorData.message}`
      );
    }

    const data = await response.json();
    return data.video;
  } catch (error) {
    console.error("Failed to create video:", error);
    throw error;
  }
};

export const updateVideo = (videoId, videoData) => {
  const formData = new FormData();
  formData.append("videoId", videoData.videoId);

  // Nettoyer les valeurs des champs title et description
  const sanitizedTitle = DOMPurify.sanitize(videoData.title);
  const sanitizedDescription = DOMPurify.sanitize(videoData.description);
  formData.append("title", sanitizedTitle);
  formData.append("description", sanitizedDescription);
  formData.append("fileUrl", videoData.file);
  formData.append("thumbnail", videoData.thumbnailUrl);
  formData.append("status", videoData.status);
  return fetch(urlApi + `video/${videoId}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch((error) => {
      console.error(error.message); // Gestion de l'erreur de la requête
    });
};

export const blockVideo = (videoId) => {
  return fetch(`${urlApi}video/${videoId}/block`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })

    .catch((error) => {
      console.error(error.message); // Gestion de l'erreur de la requête
    });
};

export const hideVideo = (videoId) => {
  return fetch(`${urlApi}video/${videoId}/hide`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })

    .catch((error) => {
      console.error(error.message); // Gestion de l'erreur de la requête
    });
};

export const getVideoById = (videoId) => {
  return fetch(`${urlApi}video/${videoId}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error.message); // Gestion de l'erreur de la requête
    });
};

export const fetchSearchVideos = async (search) => {
  try {
    const sanitizedSearch = DOMPurify.sanitize(search);

    const response = await fetch(
      urlApi + `utils/search/?query=${sanitizedSearch}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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

export const blockAndUnhideVideo = (videoId) => {
  return fetch(`${urlApi}video/${videoId}/public`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })

    .catch((error) => {
      console.error(error.message); // Gestion de l'erreur de la requête
    });
};

export const deleteVideo = (videoId) => {
  return fetch(`${urlApi}video/${videoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })

    .catch((error) => {
      console.error(error.message); // Gestion de l'erreur de la requête
    });
};

export const getTopVideos = async () => {
  try {
    const response = await fetch(`${urlApi}video/top`);
    if (!response.ok) {
      throw new Error("Failed to fetch top videos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch top videos:", error);
    throw error;
  }
};
