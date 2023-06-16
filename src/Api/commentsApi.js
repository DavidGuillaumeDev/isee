const urlApi = "http://localhost:3000/";

export const createComment = async (videoId, content) => {
    console.log(videoId, content)
    try {
      const response = await fetch(urlApi+`comment/${videoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:"include",
        body: JSON.stringify({ content }),
      });
  
      if (response.ok) {
        const comment = await response.json();
        return comment;
      } else {
        throw new Error('Failed to create comment');
      }
    } catch (error) {
      throw error;
    }
  };
  
  export const getCommentsByVideoId = async (videoId) => {
    try {
      const response = await fetch(urlApi+`comment/${videoId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
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
      const response = await fetch(urlApi+ `comment/${commentId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:'include',
        body: JSON.stringify({ content }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create comment reply');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to create comment reply');
    }
  };
  