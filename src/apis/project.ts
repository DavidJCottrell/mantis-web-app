import { api } from "./api";

export const addProject = (data) => api.post("/project/add", data);

export const getProject = (id) =>
	api
		.get(`/project/${id}`)
		.then((res) => res.data)
		.catch((e) => e.response);

export const getInvitations = (id) =>
	api
		.get(`/project/invitations/${id}`)
		.then((res) => res.data)
		.catch((e) => e.response);

export const addTask = (id, data) =>
	api
		.patch(`/project/addtask/${id}`, data)
		.then((res) => res.data)
		.catch((e) => e.response);

export const removeTask = (projectId, taskId) =>
	api
		.patch(`/project/removetask/${projectId}/${taskId}`)
		.then((res) => res.data)
		.catch((e) => e.response);

export const removeUser = (projectId, userId) =>
	api
		.patch(`/project/removeuser/${projectId}/${userId}`)
		.then((res) => res.data)
		.catch((e) => e.response);
