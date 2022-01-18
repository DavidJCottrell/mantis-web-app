function login(data) {
	localStorage.setItem("logged-in", true);
	localStorage.setItem("auth-token", data.token);
	localStorage.setItem("user-id", data.user._id);
	localStorage.setItem("firstname", data.user.firstName);
	localStorage.setItem("lastname", data.user.lastName);
	localStorage.setItem(
		"fullname",
		data.user.firstName + " " + data.user.lastName
	);
	localStorage.setItem("username", data.user.username);
	localStorage.setItem("email", data.user.email);
}

function logout() {
	localStorage.clear();
}

function isAuthenticated() {
	return localStorage.getItem("logged-in") === "true";
}

export default { login, logout, isAuthenticated };
