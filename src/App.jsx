import React from "react";
import { Routes, Route } from "react-router-dom";

//Pages
import ProtectedRoute from "./ProtectedRoute";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import Project from "./projects/Project";
import Requirements from "./requirements/Requirements";
import Task from "./task/Task";
import PageNotFound from "./PageNotFound";

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

				<Route path='/project' element={<ProtectedRoute />}>
					<Route path='/project' element={<Project />} />
				</Route>

				<Route path='/project/requirements' element={<ProtectedRoute />}>
					<Route path='/project/requirements' element={<Requirements />} />
				</Route>

				<Route path='/project/task' element={<ProtectedRoute />}>
					<Route path='/project/task' element={<Task />} />
				</Route>

				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</ThemeProvider>
	);
};

export default App;
