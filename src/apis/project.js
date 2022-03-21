import { api, handleError } from "./api";

export const addProject = (data) => api.post("/project/add", data);

export const getProject = (id) =>
	api
		.get(`/project/getproject/${id}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const getInvitations = (id) =>
	api
		.get(`/project/invitations/${id}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const removeUser = (projectId, userId) =>
	api
		.patch(`/project/removeuser/${projectId}/${userId}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const deleteProject = (projectId) =>
	api
		.delete(`/project/delete/${projectId}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const getRole = (projectId, userId) =>
	api
		.get(`/project/getrole/${projectId}/${userId}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const updateUserRole = (projectId, userId, role) =>
	api
		.patch(`/project/updateuserrole/${projectId}/${userId}`, role)
		.then((res) => res.data)
		.catch((e) => handleError(e));
