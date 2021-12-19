import React from "react";
import { Route, Redirect } from "react-router-dom";

import auth from "../utils/auth";

const ProtectedRoute = ({ component: Component }) => {
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
