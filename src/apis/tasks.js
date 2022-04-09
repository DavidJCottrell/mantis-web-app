import { api, handleError } from "./api";

export const getSubTasks = (projectId, taskId) =>
	api
		.get(`/projects/tasks/subtasks/${projectId}/${taskId}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const getTask = (projectId, taskId) =>
	api
		.get(`/projects/tasks/gettask/${projectId}/${taskId}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const getTaskComments = (projectId, taskId) =>
	api
		.get(`/projects/tasks/comments/${projectId}/${taskId}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const updateTaskComments = (projectId, taskId, comments) =>
	api
		.patch(`/projects/tasks/comments/updatecomments/${projectId}/${taskId}`, comments)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const updateSubtasks = (projectId, taskId, data) =>
	api
		.patch(`/projects/tasks/updatesubtasks/${projectId}/${taskId}`, data)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const removeTask = (projectId, taskId) =>
	api
		.patch(`/projects/tasks/removetask/${projectId}/${taskId}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const addTask = (id, data) =>
	api
		.patch(`/projects/tasks/addtask/${id}`, data)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const updateStatus = (projectId, taskId, data) =>
	api
		.patch(`/projects/tasks/updatestatus/${projectId}/${taskId}`, data)
		.then((res) => res.data)
		.catch((e) => handleError(e));
