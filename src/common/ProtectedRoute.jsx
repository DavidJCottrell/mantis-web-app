import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, auth }) => {
	return (
		<Route
			// {...rest}
			render={(props) => {
				if (auth.isAuthenticated()) {
					return <Component {...props} auth={auth} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: "/login",
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
	);
};

export default ProtectedRoute;
