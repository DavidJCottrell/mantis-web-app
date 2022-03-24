import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:9000",
	headers: {
		"auth-token": localStorage.getItem("authToken"),
	},
});

export const handleError = (e) => {
	switch (e.response.status) {
		case 401: // Client has an invalid token
			localStorage.clear();
			window.location.href = "/";
			break;
		case 400: // Could not find recourse (invalid id passed in url)
			window.location.href = "/";
			break;
		default:
			console.log("Unknown error:", e.response);
	}
};
