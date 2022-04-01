import axios from "axios";
import toast from "react-hot-toast";

import auth from "../auth";

export const api = axios.create({
	baseURL: "http://localhost:9000",
	headers: {
		"auth-token": localStorage.getItem("authToken"),
	},
});

export const handleError = (e) => {
	// User has an invalid auth token (status 401)
	if (e.response.status === 401) auth.logout();
	else {
		toast.error(`${e.response.status}: ${e.response.data}`);
		// setTimeout(() => {
		// 	window.location.href = "/";
		// }, 2000);
	}
};
