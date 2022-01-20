import { makeStyles } from "@mui/styles";
const drawerWidth = 240;
const NavStyles = makeStyles((theme) => ({
	toolbar: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	grow: {
		flexGrow: 1,
		display: "flex",
	},
}));

const notificationListStyles = makeStyles(() => ({
	grow: {
		flexGrow: 1,
		display: "flex",
	},
	card: {
		width: 200,
		maxHeight: 200,
		"&:hover": {
			backgroundColor: "rgba(0, 0, 0, 0.04)",
		},
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
}));

export { NavStyles, notificationListStyles };
