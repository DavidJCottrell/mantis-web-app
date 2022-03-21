import { api, handleError } from "./api";

export const getProjectsData = () =>
	api
		.get("/user/projects/")
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const signUp = (data) =>
	api
		.post("/user/register/", data)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const login = (data) => api.post("/user/login/", data);

export const getInvitations = () =>
	api
		.get("/user/invitations/")
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const getTasks = () =>
	api
		.get("/user/tasks/")
		.then((res) => res.data)
		.catch((e) => handleError(e));
