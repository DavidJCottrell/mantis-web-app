import React from "react";
import { createTheme } from "@mui/material/styles";

export const makeTheme = (prefersDarkMode) => {
	return React.useMemo(
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
};
