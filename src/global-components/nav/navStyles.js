import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";

const drawerWidth = 240;

const NavStyles = makeStyles((theme) => ({
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
		inlineSize: 220,
		minWidth: 220,
		overflowWrap: "break-word",
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

const invitationListStyles = makeStyles(() => ({
	grow: {
		flexGrow: 1,
		display: "flex",
	},
	card: {
		width: 250,
		maxHeight: 200,
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "drawerOpen",
})(({ theme, drawerOpen }) => ({
	backgroundColor: "#3A9922",
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(drawerOpen && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

export { NavStyles, notificationListStyles, invitationListStyles, AppBar };
