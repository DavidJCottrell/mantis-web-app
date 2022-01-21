import React from "react";
import { Routes, Route } from "react-router-dom";

//Pages
import ProtectedRoute from "./common/ProtectedRoute";
import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import Projects from "./projects/Projects";
import Requirements from "./requirements/Requirements";
import Task from "./task/Task";
import PageNotFound from "./PageNotFound";

//Theme
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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
				<Route exact path='/login' element={<Login />}></Route>
				<Route exact path='/' element={<ProtectedRoute />}>
					<Route exact path='/' element={<Dashboard />} />
				</Route>
				<Route exact path='/projects' element={<ProtectedRoute />}>
					<Route exact path='/projects' element={<Projects />} />
				</Route>

				<Route exact path='/project' element={<ProtectedRoute />}>
					<Route exact path='/project' element={<Projects />} />
				</Route>

				<Route
					exact
					path='/project/requirements'
					element={<ProtectedRoute />}
				>
					<Route
						exact
						path='/project/requirements'
						element={<Requirements />}
					/>
				</Route>

				<Route exact path='/project/task' element={<ProtectedRoute />}>
					<Route exact path='/project/task' element={<Task />} />
				</Route>

				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</ThemeProvider>
	);
};

export default App;
