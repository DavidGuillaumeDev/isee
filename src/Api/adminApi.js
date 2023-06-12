const urlApi= "http://localhost:3000/"


export const getDashboard = async () => {
    try {
      const response = await fetch(urlApi + "/dashboard", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        //   Authorization: `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  