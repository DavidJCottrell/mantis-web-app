function login(data, token) {
	localStorage.setItem("logged-in", true);
	localStorage.setItem("auth-token", token);
	localStorage.setItem("user-id", data._id);
	localStorage.setItem("firstname", data.firstName);
	localStorage.setItem("lastname", data.lastName);
	localStorage.setItem("fullname", data.firstName + " " + data.lastName);
	localStorage.setItem("username", data.username);
	localStorage.setItem("email", data.email);
}

function logout() {
	localStorage.clear();
}

function isAuthenticated() {
	return localStorage.getItem("logged-in") === "true";
}

export default { login, logout, isAuthenticated };
