const login = (data) => {
	localStorage.setItem("isLoggedIn", true);
	localStorage.setItem("authToken", data.token);
	localStorage.setItem("userId", data.user._id);
	localStorage.setItem("firstName", data.user.firstName);
	localStorage.setItem("lastName", data.user.lastName);
	localStorage.setItem("fullName", data.user.firstName + " " + data.user.lastName);
	localStorage.setItem("username", data.user.username);
	localStorage.setItem("email", data.user.email);
	window.location.href = "/";
};
const logout = () => {
	window.location.href = "/login";
	localStorage.clear();
};

const isAuthenticated = () => localStorage.getItem("isLoggedIn") === "true";

export default { login, logout, isAuthenticated };
