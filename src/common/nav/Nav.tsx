import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useQuery } from "react-query";

//Material-UI Components
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
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

import { NavStyles, DrawerHeader, AppBar, Drawer } from "./navStyles";
import UserOptions from "./UserOptions";
import ProfileMenu from "./ProfileMenu";
import InvitationList from "./InvitationList";
import TaskList from "./TaskList";
import { commentsData } from "../../testData";

import * as userApis from "../../apis/user";

const drawerWidth = 240;

const Nav = ({
	userType,
	showDrawer,
	handleAddProjectOpen,
	handleAddUserOpen,
	handleAddTaskOpen,
	handleManageTeamOpen,
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

	const taskQuery = useQuery("fetchUsersTasks", userApis.getTasks);

	const invitationQuery = useQuery(
		"fetchUsersInvitations",
		userApis.getInvitations
	);

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
									invitationQuery.isSuccess
										? invitationQuery.data.length
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
									taskQuery.data
										? taskQuery.data.length
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
						<UserOptions
							userType={userType}
							handleAddUserOpen={handleAddUserOpen}
							handleAddTaskOpen={handleAddTaskOpen}
							handleManageTeamOpen={handleManageTeamOpen}
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

			{invitationQuery.isSuccess ? (
				<InvitationList
					open={isInvitationMenuOpen}
					anchorElement={invitationAnchor}
					handleClose={handleInvitationListClose}
					invitationData={invitationQuery.data}
				/>
			) : null}

			{/* Tasks List */}
			{taskQuery.isSuccess ? (
				<TaskList
					title={"Your tasks:"}
					type={"tasks"}
					open={isTaskMenuOpen}
					anchorElement={tasksAnchor}
					handleClose={handleTaskListClose}
					data={taskQuery.data}
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
