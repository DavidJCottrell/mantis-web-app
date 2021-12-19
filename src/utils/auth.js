function login(token) {
	localStorage.setItem("logged-in", true);
	localStorage.setItem("auth-token", token);
}

function logout() {
	localStorage.setItem("logged-in", false);
	localStorage.removeItem("auth-token");
}

function isAuthenticated() {
	return localStorage.getItem("logged-in") === "true";
}

export default { login, logout, isAuthenticated };
