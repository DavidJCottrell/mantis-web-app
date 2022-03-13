import { api } from "./api";

export const addProject = (data) => api.post("/project/add", data);

export const getProject = (id) =>
	api
		.get(`/project/getproject/${id}`)
		.then((res) => res.data)
		.catch((e) => e.response);

export const getInvitations = (id) =>
	api
		.get(`/project/invitations/${id}`)
		.then((res) => res.data)
		.catch((e) => e.response);

export const removeUser = (projectId, userId) =>
	api
		.patch(`/project/removeuser/${projectId}/${userId}`)
		.then((res) => res.data)
		.catch((e) => e.response);

export const deleteProject = (projectId) =>
	api
		.delete(`/project/delete/${projectId}`)
		.then((res) => res.data)
		.catch((e) => e.response);

export const getRole = (projectId, userId) =>
	api
		.get(`/project/getrole/${projectId}/${userId}`)
		.then((res) => res.data)
		.catch((e) => e.response);
