import { makeStyles } from "@mui/styles";

const loginStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
		// minHeight: "-webkit-fill-available",
		// minHeight: "-moz-available",
		// minHeight: "-fill-available",
	},
	center: {
		display: "grid",
		placeItems: "center",
		justifyContent: "center",
		height: "100%",
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	logo: {
		width: "200px",
		height: "200px",
		marginLeft: "auto",
		marginRight: "auto",
	},
}));

export { loginStyles };
