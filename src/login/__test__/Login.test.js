// Testing
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// import { expect } from "chai";

// React Query
import { QueryClient, QueryClientProvider } from "react-query";

// Theme
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeProvider } from "@mui/material/styles";
import { makeTheme } from "../../theme";

import * as usersApis from "../../apis/users";

// Component to test
import Login from "../Login";

const MockLogin = () => {
	const theme = makeTheme(useMediaQuery("(prefers-color-scheme: dark)"));
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<Login />
			</ThemeProvider>
		</QueryClientProvider>
	);
};

describe("Login", () => {
	it("User can login", async () => {
		const result = render(<MockLogin />);
		const emailInputEl = result.container.querySelector("#email-input");
		const passwordInputEl = result.container.querySelector("#password-input");
		const signInBtnEl = result.container.querySelector("#sign-in-btn");

		userEvent.type(emailInputEl, "david@gmail.com");
		userEvent.type(passwordInputEl, "password1");

		userEvent.click(signInBtnEl);

		expect(usersApis.Login).toHaveBeenCalledTimes(1);

		// expect(localStorage.getItem("authToken").to.not.be.null);
	});
});
