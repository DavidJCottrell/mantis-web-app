import { api, handleError } from "./api";

export const signUp = (data) => api.post("/users/register/", data);
export const login = (data) => api.post("/users/login/", data);

export const getUserProjects = () =>
	api
		.get("/users/projects/")
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const getInvitations = () =>
	api
		.get("/users/invitations/")
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const getTasks = () =>
	api
		.get("/users/tasks/")
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const followTask = (projectId, taskId) =>
	api
		.patch(`/users/followtask/${projectId}/${taskId}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const unfollowTask = (projectId, taskId) =>
	api
		.delete(`/users/unfollowtask/${projectId}/${taskId}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const getlatestfollowedtaskcomments = (data) =>
	api
		.post("/users/getlatestfollowedtaskcomments/", data)
		.then((res) => res.data)
		.catch((e) => handleError(e));
