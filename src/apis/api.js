import axios from "axios";

export const api = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		"auth-token": localStorage.getItem("auth-token"),
	},
});
