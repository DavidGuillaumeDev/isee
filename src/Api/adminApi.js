import DOMPurify from 'dompurify';


const urlApi = "http://localhost:3000/";

export const getDashboard = async () => {
  try {
    const response = await fetch(urlApi + "admin/dashboard", {
      method: "GET",
      credentials: "include",
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

export const checkAdminStatus = async () => {
  try {
    const response = await fetch(urlApi + "admin/isAdmin", {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to check admin status");
    }

    const data = await response.json();
    return data.isAdmin;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to check admin status");
  }
};

export const fetchWeeklyDashboard = async () => {
  try {
    const response = await fetch(urlApi + "admin/weekly", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Failed to fetch weekly dashboard data");
  }
};

export const fetchMonthlyDashboard = async () => {
  try {
    const response = await fetch(urlApi + "admin/monthly", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Failed to fetch monthly dashboard data");
  }
};

export const fetchDailyDashboard = async () => {
  try {
    const response = await fetch(urlApi + "admin/daily", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to fetch daily dashboard data");
  }
};
