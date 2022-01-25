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

export const getInvitations = () =>
	api
		.get("/user/invitations/")
		.then((res) => res.data)
		.catch((e) => e.response);

export const getTasks = () =>
	api
		.get("/user/tasks/")
		.then((res) => res.data)
		.catch((e) => e.response);
