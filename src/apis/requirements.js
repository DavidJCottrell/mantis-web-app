import { api, handleError } from "./api";

export const addRequirement = (id, data) =>
	api
		.patch(`/projects/requirements/addrequirement/${id}`, data)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const updateRequirement = (projectId, requirementIndex, data) =>
	api
		.patch(`/projects/requirements/updaterequirement/${projectId}/${requirementIndex}`, data)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const removeRequirement = (projectId, requirementIndex) =>
	api
		.patch(`/projects/requirements/removerequirement/${projectId}/${requirementIndex}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const getRequirements = (id) =>
	api
		.get(`/projects/requirements/getall/${id}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));
