import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../Services/AuthService.js";

// GuestRoute only renders its component for users who are NOT logged in.
// Logged-in users are redirected to the football schedule.
const GuestRoute = ({ element: Component, ...rest }) => {
  if (getCurrentUser()) {
    return <Navigate to="/main" replace />;
  }
  return <Component {...rest} />;
};

export default GuestRoute;