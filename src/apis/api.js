import axios from "axios";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";

import auth from "../auth";

export const api = axios.create({
	baseURL: "http://localhost:9000",
	headers: {
		"auth-token": localStorage.getItem("authToken"),
	},
});

let errorCounter = 0;

export const handleError = (e) => {
	// User has an invalid auth token (status 401)
	if (e.response.status === 401) auth.logout();
	else {
		errorCounter++;
		toast.error(`${e.response.status}: ${e.response.data}`);
		if (errorCounter < 2) {
			toast.custom(
				<div style={{}}>
					<Button
						variant='contained'
						onClick={() => {
							window.location.href = "/";
						}}
					>
						Go Back
					</Button>
				</div>,
				{ duration: Infinity }
			);
		}
	}
};
