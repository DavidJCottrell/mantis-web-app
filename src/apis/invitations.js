import { api, handleError } from "./api";

export const addInvitation = (username, invitation) =>
	api
		.post(`/invitations/addinvitation/${username}`, invitation)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const deleteInvitation = (invitationId) =>
	api
		.delete(`/invitations/delete/${invitationId}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));

export const acceptInvitation = (invitationId) =>
	api
		.post(`/invitations/accept/${invitationId}`)
		.then((res) => res.data)
		.catch((e) => handleError(e));
