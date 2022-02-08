function login(data) {
	localStorage.setItem("isLoggedIn", true);
	localStorage.setItem("auth-token", data.token);
	localStorage.setItem("userId", data.user._id);
	localStorage.setItem("firstName", data.user.firstName);
	localStorage.setItem("lastName", data.user.lastName);
	localStorage.setItem(
		"fullName",
		data.user.firstName + " " + data.user.lastName
	);
	localStorage.setItem("username", data.user.username);
	localStorage.setItem("email", data.user.email);
}

function logout() {
	localStorage.clear();
}

function isAuthenticated() {
	return localStorage.getItem("isLoggedIn") === "true";
}

export default { login, logout, isAuthenticated };
