function login(data) {
	localStorage.setItem("logged-in", true);
	localStorage.setItem("auth-token", data.token);
	localStorage.setItem("user-id", data._id);
}

function logout() {
	localStorage.setItem("logged-in", false);
	localStorage.removeItem("auth-token");
	localStorage.removeItem("user-id");
}

function isAuthenticated() {
	return localStorage.getItem("logged-in") === "true";
}

export default { login, logout, isAuthenticated };
