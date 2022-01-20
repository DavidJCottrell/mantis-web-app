import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import axios from "axios";
import { useQuery } from "react-query";

//Material-UI Components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";

// Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MailIcon from "@mui/icons-material/Mail";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddIcon from "@mui/icons-material/Add";

import { NavStyles } from "./navStyles";
import UserOptions from "./UserOptions";
import ProfileMenu from "./ProfileMenu";
import NotificationList from "./NotificationList";
import { commentsData } from "../../testData";

const Nav = ({
	userType,
	showDrawer,
	handleAddProjectOpen,
	handleAddUserOpen,
	handleAddTaskOpen,
	children,
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

	// Comment List Logic
	const [taggedCommentsAnchor, setTaggedCommentsAnchor] = useState(); //State
	const handleTaggedCommentsListOpen = (event) =>
		setTaggedCommentsAnchor(event.currentTarget); //Handle open
	const handleTaggedCommentsListClose = () => setTaggedCommentsAnchor(null); //Handle close
	const isTaggedCommentsListOpen = Boolean(taggedCommentsAnchor); //Is open

	const taskData = useQuery("fetchUsersTasks", () =>
		axios.get("http://localhost:9000/user/usertasks/", {
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
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: drawerOpen,
				})}
			>
				<Toolbar>
					{showDrawer ? (
						<IconButton
							color='inherit'
							aria-label='open drawer'
							onClick={handleDrawerOpen}
							edge='start'
							className={clsx(classes.menuButton, {
								[classes.hide]: drawerOpen,
							})}
						>
							<MenuIcon />
						</IconButton>
					) : null}
					<Typography variant='h6' noWrap>
						Mantis
					</Typography>
					<div className={classes.grow} />
					{!showDrawer ? (
						<Tooltip title='Add a project'>
							<IconButton
								color='inherit'
								onClick={handleAddProjectOpen}
							>
								<AddIcon />
							</IconButton>
						</Tooltip>
					) : null}
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
					<Drawer
						variant='permanent'
						className={clsx(classes.drawer, {
							[classes.drawerOpen]: drawerOpen,
							[classes.drawerClose]: !drawerOpen,
						})}
						classes={{
							paper: clsx({
								[classes.drawerOpen]: drawerOpen,
								[classes.drawerClose]: !drawerOpen,
							}),
						}}
					>
						<div className={classes.toolbar}>
							<Typography
								className={classes.grow}
								variant='body1'
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
						</div>
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
		</div>
	);
};

Nav.propTypes = {
	showDrawer: PropTypes.bool,
	userType: PropTypes.oneOf(["Team Leader", "Client", "Developer"]),
};

export default Nav;
