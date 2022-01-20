import React from "react";
import { Routes, Route } from "react-router-dom";

//Pages
import ProtectedRoute from "./common/ProtectedRoute";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import Projects from "./projects/Projects";
import PageNotFound from "./PageNotFound";

//Theme
import useMediaQuery from "@mui/material/useMediaQuery";
// import { createMuiTheme, ThemeProvider } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { amber, deepOrange, grey } from "@mui/material/colors";
import { purple } from "@mui/material/colors";

import Typography from "@material-ui/core/Typography";

const getDesignTokens = (mode) => ({
	palette: {
		mode,
		...(mode === "light"
			? {
					// palette values for light mode
					primary: amber,
					divider: amber[200],
					text: {
						primary: "white",
						secondary: "white",
					},
			  }
			: {
					// palette values for light mode
					primary: amber,
					divider: amber[200],
					text: {
						primary: "white",
						secondary: "white",
					},
			  }),
	},
});

const App = () => {
	const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? "dark" : "light",
					primary: {
						main: "#6bc754", //424242
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
			<Routes>
				{/* <Route exact path='/login' render={() => <Login />}></Route> */}
				<Route exact path='/login' element={<Login />}></Route>
				<Route exact path='/' element={<ProtectedRoute />}>
					<Route exact path='/' element={<Dashboard />} />
				</Route>
				<Route exact path='/projects' element={<ProtectedRoute />}>
					<Route exact path='/projects' element={<Projects />} />
				</Route>
				<Route path='*' element={PageNotFound} />
			</Routes>
		</ThemeProvider>
	);
};

export default App;
