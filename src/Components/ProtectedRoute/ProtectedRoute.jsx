import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../Services/AuthService.js";

// ProtectedRoute component checks if the user is authenticated before rendering the specified component. 
// If the user is not authenticated, it redirects them to the login page.
const ProtectedRoute = ({ element: Component, ...rest }) => {
  if (getCurrentUser()) {
    return <Component {...rest} />;
  }
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;

// Future work: Consider adding a loading state or a more sophisticated authentication check, such as token validation, to enhance security and user experience.