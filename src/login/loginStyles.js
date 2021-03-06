import { makeStyles } from "@mui/styles";

const loginStyles = makeStyles((theme) => ({
	root: {
		height: "100vh",
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
		width: "100%",
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export { loginStyles };
