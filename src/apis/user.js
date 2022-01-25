import { api } from "./api";

export const getProjectsData = () =>
	api
		.get("/user/projects/")
		.then((res) => res.data)
		.catch((e) => e.response);

export const signUp = (data) =>
	api
		.post("/user/register/", data)
		.then((res) => res.data)
		.catch((e) => e.response);

export const login = (data) =>
	api
		.post("/user/login/", data)
		.then((res) => res.data)
		.catch((e) => e.response);
