import { api } from "./api";

export const getSubTasks = (projectId, taskId) =>
	api
		.get(`/project/tasks/subtasks/${projectId}/${taskId}`)
		.then((res) => res.data)
		.catch((e) => e.response);

export const getTask = (projectId, taskId) =>
	api
		.get(`/project/tasks/gettask/${projectId}/${taskId}`)
		.then((res) => res.data)
		.catch((e) => e.response);

export const getTaskComments = (projectId, taskId) =>
	api
		.get(`/project/tasks/comments/${projectId}/${taskId}`)
		.then((res) => res.data)
		.catch((e) => e.response);

export const updateTaskComments = (projectId, taskId, comments) =>
	api
		.patch(`/project/tasks/comments/updatecomments/${projectId}/${taskId}`, comments)
		.then((res) => res.data)
		.catch((e) => e.response);

export const updateSubtasks = (projectId, taskId, data) =>
	api
		.patch(`/project/tasks/updatesubtasks/${projectId}/${taskId}`, data)
		.then((res) => res.data)
		.catch((e) => e.response);

export const removeTask = (projectId, taskId) =>
	api
		.patch(`/project/tasks/removetask/${projectId}/${taskId}`)
		.then((res) => res.data)
		.catch((e) => e.response);

export const addTask = (id, data) =>
	api
		.patch(`/project/tasks/addtask/${id}`, data)
		.then((res) => res.data)
		.catch((e) => e.response);

export const updateStatus = (projectId, taskId, data) => {
	return api.patch(`/project/tasks/updatestatus/${projectId}/${taskId}`, data);
};

export const updateResolution = (projectId, taskId, data) => {
	return api.patch(`/project/tasks/updateresolution/${projectId}/${taskId}`, data);
};
