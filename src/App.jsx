import React from "react";
import { Route, Switch } from "react-router-dom";

//Pages
import ProtectedRoute from "./common/ProtectedRoute";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import Projects from "./projects/Projects";
import PageNotFound from "./PageNotFound";

//Theme
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import auth from "./utils/auth";

const App = () => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const theme = React.useMemo(
		() =>
			createMuiTheme({
				palette: {
					type: prefersDarkMode ? "dark" : "light",
					primary: {
						main: "#424242",
					},
					secondary: {
						main: "#43a047",
					},
					background: {
						default: prefersDarkMode ? "#212121" : "#fafafa",
					},
				},
			}),
		[prefersDarkMode]
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Switch>
				<Route exact path='/login' render={() => <Login auth={auth} />}></Route>
				<ProtectedRoute exact path='/' component={Dashboard} auth={auth} />
				<ProtectedRoute exact path='/projects' component={Projects} auth={auth} />
				<Route path='*' component={PageNotFound} />
			</Switch>
		</ThemeProvider>
	);
};

export default App;
