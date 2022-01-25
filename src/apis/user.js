import axios from "axios";

const api = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
	headers: {
		"auth-token": localStorage.getItem("auth-token"),
	},
});

export const getProjectsData = () =>
	api
		.get("/user/projects/")
		.then((res) => res.data)
		.catch((e) => e.response);
