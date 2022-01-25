import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import auth from "../utils/auth";

const ProtectedRoute = () => {
	// If authorized, return an outlet that will render child elements
	// If not, return element that will navigate to login page
	return auth.isAuthenticated() ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
