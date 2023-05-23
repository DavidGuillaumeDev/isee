const urlApi= "http://localhost:3000/"

export const fetchUserVideos = async (userId) => {
    try {
      const response = await fetch(urlApi + `video/user/${userId}`);
    
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch user videos');
    }
  };

  export const fetchAllVideos = async () => {
    try {
     
      const response = await fetch(urlApi+ `video/`);
        
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch user videos');
    }
  };

  export const createVideo = async (videoData) => {
    try {
      const response = await fetch(urlApi + 'videos/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(videoData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create video');
      }
  
      const data = await response.json();
      return data.video;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create video');
    }
  };


  export const updateVideo = (videoId, updatedData) => {
    return fetch(urlApi + `videos/${videoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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

  export const blockVideo = (videoId) => {
    return fetch(`${urlApi}/videos/block/${videoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
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
    return fetch(`${urlApi}/videos/${videoId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        console.log(data); // Données de la vidéo récupérées avec succès
      })
      .catch((error) => {
        console.error(error.message); // Gestion de l'erreur de la requête
      });
  };
  