export const fetchUserVideos = async (userId) => {
    try {
        console.log(userId,"test")
        const url =`http://localhost:3000/video/user/${userId}`;
        console.log(url)
      const response = await fetch(url);
      console.log(response,"Response")
    
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch user videos');
    }
  };

  export const fetchAllVideos = async () => {
    try {
        const url =`http://localhost:3000/video/`;
        console.log(url)
      const response = await fetch(url);
      console.log(response,"Response")
    
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch user videos');
    }
  };
    
    