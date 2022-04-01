import { api, handleError } from "./api";

export const addProject = (data) =>
	api
		.post("/projects/add", data)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const getProject = (id) =>
	api
		.get(`/projects/getproject/${id}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const getInvitations = (id) =>
	api
		.get(`/projects/invitations/${id}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const removeUser = (projectId, userId) =>
	api
		.patch(`/projects/removeuser/${projectId}/${userId}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const deleteProject = (projectId) =>
	api
		.delete(`/projects/delete/${projectId}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const getRole = (projectId) =>
	api
		.get(`/projects/getrole/${projectId}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const updateUserRole = (projectId, userId, role) =>
	api
		.patch(`/projects/updateuserrole/${projectId}/${userId}`, role)
		.then((res) => res.data)
		.catch((e) => handleError(e));
