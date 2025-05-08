import { Navigate, Outlet } from "react-router-dom";

// Check if the user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const { exp } = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000;
    return exp > now;
  } 
  catch {
    return false;
  }
};

// PrivateRoute component
export const PrivateRoute = () => {
  if (!isAuthenticated()) {
    alert("Login required");
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
