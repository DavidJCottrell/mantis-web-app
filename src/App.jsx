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
import { ThemeProvider } from "@mui/material/styles";
import { makeTheme } from "./theme";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
	const theme = makeTheme(useMediaQuery("(prefers-color-scheme: dark)"));
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
