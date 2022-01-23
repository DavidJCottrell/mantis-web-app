import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useQuery } from "react-query";

//Material-UI Components
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { styled, useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { NavStyles } from "./navStyles";
import UserOptions from "./UserOptions";
import ProfileMenu from "./ProfileMenu";
import NotificationList from "./NotificationList";
import InvitationList from "./InvitationList";
import { commentsData, invitationData } from "../../testData";

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(7)} + 1px)`, // prev 9
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "drawerOpen",
})(({ theme, drawerOpen }) => ({
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

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "drawerOpen",
})(({ theme, drawerOpen }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(drawerOpen && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!drawerOpen && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const Nav = ({
	userType,
	showDrawer,
	handleAddProjectOpen,
	handleAddUserOpen,
	handleAddTaskOpen,
	children,
	showAddProject,
}) => {
	const classes = NavStyles();
	const theme = useTheme();

	//Drawer Logic
	const [drawerOpen, setDrawerOpen] = useState(false); //State
	const handleDrawerOpen = () => setDrawerOpen(true); //Handle open
	const handleDrawerClose = () => setDrawerOpen(false); //Handle close

	// Profile Menu Logic
	const [profileAnchor, setProfileAnchor] = useState(); //State
	const handleProfileMenuOpen = (event) =>
		setProfileAnchor(event.currentTarget); //Handle open
	const handleProfileMenuClose = () => setProfileAnchor(null); //Handle close
	const isProfileMenuOpen = Boolean(profileAnchor); //Is open

	// Task List Logic
	const [tasksAnchor, setTasksAnchor] = useState(); //State
	const hanleTaskListOpen = (event) => setTasksAnchor(event.currentTarget); //Handle open
	const handleTaskListClose = () => setTasksAnchor(null); //Handle close
	const isTaskMenuOpen = Boolean(tasksAnchor); //Is open

	// Invitations List Logic
	const [invitationAnchor, setInvitationAnchor] = useState(); //State
	const hanleInvitationListOpen = (event) =>
		setInvitationAnchor(event.currentTarget); //Handle open
	const handleInvitationListClose = () => setInvitationAnchor(null); //Handle close
	const isInvitationMenuOpen = Boolean(invitationAnchor); //Is open

	// Comment List Logic
	const [taggedCommentsAnchor, setTaggedCommentsAnchor] = useState(); //State
	const handleTaggedCommentsListOpen = (event) =>
		setTaggedCommentsAnchor(event.currentTarget); //Handle open
	const handleTaggedCommentsListClose = () => setTaggedCommentsAnchor(null); //Handle close
	const isTaggedCommentsListOpen = Boolean(taggedCommentsAnchor); //Is open

	const taskData = useQuery("fetchUsersTasks", () =>
		axios.get(process.env.REACT_APP_BASE_URL + "/user/usertasks/", {
			headers: {
				"auth-token": localStorage.getItem("auth-token"),
			},
		})
	);
	if (taskData.error) console.log(taskData.error);

	// if (taskData.isSuccess) console.log(taskData.data.data.length);

	//Get Task and Comment Data
	const [taggedComments, setTaggedComments] = useState(false);
	useEffect(() => {
		setTaggedComments(commentsData);
	}, []);

	return (
		<Box sx={{ display: "flex" }}>
			<AppBar position='fixed' drawerOpen={drawerOpen}>
				<Toolbar>
					{showDrawer ? (
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
						>
							<MenuIcon />
						</IconButton>
					) : null}
					<Typography variant='h6' noWrap>
						Mantis
					</Typography>
					<div className={classes.grow} />
					{showAddProject ? (
						<Tooltip title='Add a project'>
							<IconButton
								color='inherit'
								onClick={handleAddProjectOpen}
							>
								<AddIcon />
							</IconButton>
						</Tooltip>
					) : null}
					<Tooltip title='Project invitations'>
						<IconButton
							color='inherit'
							onClick={hanleInvitationListOpen}
						>
							<Badge
								badgeContent={
									taggedComments
										? taggedComments.length
										: null
								}
								color='secondary'
							>
								<AddCircleIcon />
							</Badge>
						</IconButton>
					</Tooltip>
					<Tooltip title='Tagged comments'>
						<IconButton
							color='inherit'
							onClick={handleTaggedCommentsListOpen}
						>
							<Badge
								badgeContent={
									taggedComments
										? taggedComments.length
										: null
								}
								color='secondary'
							>
								<MailIcon />
							</Badge>
						</IconButton>
					</Tooltip>
					<Tooltip title='Your tasks'>
						<IconButton color='inherit' onClick={hanleTaskListOpen}>
							<Badge
								badgeContent={
									taskData.data
										? taskData.data.data.length
										: null
								}
								color='secondary'
							>
								<AssignmentIcon />
							</Badge>
						</IconButton>
					</Tooltip>
					<Tooltip title='Account'>
						<IconButton
							color='inherit'
							onClick={handleProfileMenuOpen}
						>
							<AccountCircleIcon />
						</IconButton>
					</Tooltip>
				</Toolbar>
			</AppBar>

			{showDrawer ? (
				<React.Fragment>
					<Drawer variant='permanent' drawerOpen={drawerOpen}>
						<DrawerHeader>
							<Typography
								className={classes.grow}
								variant='body1'
								style={{ paddingLeft: "10px" }}
							>
								{userType}
							</Typography>
							<IconButton onClick={handleDrawerClose}>
								{theme.direction === "rtl" ? (
									<ChevronRightIcon />
								) : (
									<ChevronLeftIcon />
								)}
							</IconButton>
						</DrawerHeader>
						<Divider />
						<UserOptions userType='All' />
						<Divider />
						<UserOptions
							userType={userType}
							handleAddUserOpen={handleAddUserOpen}
							handleAddTaskOpen={handleAddTaskOpen}
						/>
					</Drawer>
					{/* Main content of page */}
					<main className={classes.content}>
						<div className={classes.toolbar} />
						{children}
					</main>
				</React.Fragment>
			) : null}

			<ProfileMenu
				open={isProfileMenuOpen}
				anchorElement={profileAnchor}
				handleClose={handleProfileMenuClose}
			/>

			{/* Tagged Comments List */}
			{/* <NotificationList
				title={"Your tagged comments:"}
				type={"comments"}
				open={isTaggedCommentsListOpen}
				anchorElement={taggedCommentsAnchor}
				handleClose={handleTaggedCommentsListClose}
				data={taggedComments}
			/> */}

			<InvitationList
				open={isInvitationMenuOpen}
				anchorElement={invitationAnchor}
				handleClose={handleInvitationListClose}
				invitationData={invitationData}
			/>

			{/* Tasks List */}
			{taskData.isSuccess ? (
				<NotificationList
					title={"Your tasks:"}
					type={"tasks"}
					open={isTaskMenuOpen}
					anchorElement={tasksAnchor}
					handleClose={handleTaskListClose}
					data={taskData.data.data}
				/>
			) : null}

			<Toolbar style={{ marginBottom: "20px" }} />
		</Box>
	);
};

Nav.propTypes = {
	showDrawer: PropTypes.bool,
	userType: PropTypes.oneOf(["Team Leader", "Client", "Developer"]),
};

export default Nav;
