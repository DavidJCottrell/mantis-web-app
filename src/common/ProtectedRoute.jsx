import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import auth from "../utils/auth";

const ProtectedRoute = () => {
	// If authorized, return an outlet that will render child elements
	// If not, return element that will navigate to login page
	return auth.isAuthenticated() ? <Outlet /> : <Navigate to='/login' />;
};

// const ProtectedRoute = ({ component: Component }) => {
// 	return (
// 		<Route
// 			// {...rest}
// 			render={(props) => {
// 				if (auth.isAuthenticated()) {
// 					return <Component {...props} auth={auth} />;
// 				} else {
// 					return (
// 						<Navigate
// 							to={{
// 								pathname: "/login",
// 								state: {
// 									from: props.location,
// 								},
// 							}}
// 						/>
// 					);
// 				}
// 			}}
// 		/>
// 	);
// };

export default ProtectedRoute;
