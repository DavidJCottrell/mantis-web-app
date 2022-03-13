import { api } from "./api";

export const addRequirement = (id, data) =>
	api
		.patch(`/project/requirements/addrequirement/${id}`, data)
		.then((res) => res.data)
		.catch((e) => e.response);

export const updateRequirement = (projectId, requirementIndex, data) =>
	api
		.patch(`/project/requirements/updaterequirement/${projectId}/${requirementIndex}`, data)
		.then((res) => res.data)
		.catch((e) => e.response);

export const removeRequirement = (projectId, requirementIndex) =>
	api
		.patch(`/project/requirements/removerequirement/${projectId}/${requirementIndex}`)
		.then((res) => res.data)
		.catch((e) => e.response);

export const getRequirements = (id) =>
	api
		.get(`/project/requirements/getall/${id}`)
		.then((res) => res.data)
		.catch((e) => e.response);
