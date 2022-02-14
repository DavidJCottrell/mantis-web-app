import { api } from "./api";

export const addInvitation = (username, invitation) =>
	api
		.post(`/invitation/addinvitation/${username}`, invitation)
		.then((res) => res.data)
		.catch((e) => e.response);

export const deleteInvitation = (invitationId) =>
	api
		.delete(`/invitation/delete/${invitationId}`)
		.then((res) => res.data)
		.catch((e) => e.response);

export const acceptInvitation = (data) =>
	api
		.post("/invitation/accept/", data)
		.then((res) => res.data)
		.catch((e) => e.response);
