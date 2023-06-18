import DOMPurify from 'dompurify';

const urlApi = "http://localhost:3000/";


const sanitizeContent = (content) => {
  // Effectuez ici les opérations de nettoyage et de validation du contenu du commentaire
  // Par exemple, vous pouvez utiliser une bibliothèque de sécurité comme DOMPurify pour supprimer les balises HTML dangereuses

  // Exemple avec DOMPurify
  const sanitizedContent = DOMPurify.sanitize(content);

  return sanitizedContent;
};

export const createComment = async (videoId, content) => {
  try {
    // Vérification du contenu du commentaire pour prévenir les attaques XSS
    const sanitizedContent = sanitizeContent(content);

    if (sanitizedContent.length === 0) {
      // Le contenu est vide après désinfection, vous pouvez prendre une action appropriée
      throw new Error("Le contenu du commentaire est vide ou invalide");
    }

    const response = await fetch(urlApi + `comment/${videoId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ content: sanitizedContent.toString() }),
    });

    if (response.ok) {
      const comment = await response.json();
      return comment;
    } else {
      throw new Error("Failed to create comment");
    }
  } catch (error) {
    throw error;
  }
};



export const getCommentsByVideoId = async (videoId) => {
  try {
    const response = await fetch(urlApi + `comment/${videoId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCommentReply = async (commentId, content) => {
  try {
    const response = await fetch(urlApi + `comment/${commentId}/reply`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error("Failed to create comment reply");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to create comment reply");
  }
};


export const deleteComment = async (commentId) => {
  try {
    const response = await fetch(`${urlApi}comment/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete comment");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete comment");
  }
};