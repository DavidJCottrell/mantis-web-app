import React from "react";
import { Routes, Route } from "react-router-dom";

//Pages
import ProtectedRoute from "./global-components/ProtectedRoute";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import Projects from "./projects/Projects";
import Requirements from "./requirements/Requirements";
import Tasks from "./tasks/Tasks";
import PageNotFound from "./global-components/PageNotFound";

//Theme
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
						default: prefersDarkMode ? "#323131" : "#fafafa",
					},
				},
			}),
		[prefersDarkMode]
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Routes>
				<Route path='/login' element={<Login />}></Route>

				<Route path='/' element={<ProtectedRoute />}>
					<Route path='/' element={<Dashboard />} />
				</Route>

				<Route path='/projects/:projectId' element={<ProtectedRoute />}>
					<Route path='/projects/:projectId' element={<Projects />} />
				</Route>

				<Route path='/projects/requirements/:projectId' element={<ProtectedRoute />}>
					<Route path='/projects/requirements/:projectId' element={<Requirements />} />
				</Route>

				<Route path='/projects/tasks/:projectId/:taskId' element={<ProtectedRoute />}>
					<Route path='/projects/tasks/:projectId/:taskId' element={<Tasks />} />
				</Route>

				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</ThemeProvider>
	);
};

export default App;
