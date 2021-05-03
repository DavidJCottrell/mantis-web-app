import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

//Material-UI Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";

// Icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MailIcon from "@material-ui/icons/Mail";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AddIcon from "@material-ui/icons/Add";

import { NavStyles } from "./navStyles";
import UserOptions from "./UserOptions";
import ProfileMenu from "./ProfileMenu";
import NotificationList from "./NotificationList";
import { commentsData, taskData } from "../../testData";

const Nav = ({ userType, showDrawer, handleAddProjectOpen, children }) => {
	const classes = NavStyles();
	const theme = useTheme();

	//Drawer Logic
	const [drawerOpen, setDrawerOpen] = useState(false); //State
	const handleDrawerOpen = () => setDrawerOpen(true); //Handle open
	const handleDrawerClose = () => setDrawerOpen(false); //Handle close

	// Profile Menu Logic
	const [profileAnchor, setProfileAnchor] = useState(); //State
	const handleProfileMenuOpen = (event) => setProfileAnchor(event.currentTarget); //Handle open
	const handleProfileMenuClose = () => setProfileAnchor(null); //Handle close
	const isProfileMenuOpen = Boolean(profileAnchor); //Is open

	// Task List Logic
	const [tasksAnchor, setTasksAnchor] = useState(); //State
	const hanleTaskListOpen = (event) => setTasksAnchor(event.currentTarget); //Handle open
	const handleTaskListClose = () => setTasksAnchor(null); //Handle close
	const isTaskMenuOpen = Boolean(tasksAnchor); //Is open

	// Comment List Logic
	const [taggedCommentsAnchor, setTaggedCommentsAnchor] = useState(); //State
	const handleTaggedCommentsListOpen = (event) => setTaggedCommentsAnchor(event.currentTarget); //Handle open
	const handleTaggedCommentsListClose = () => setTaggedCommentsAnchor(null); //Handle close
	const isTaggedCommentsListOpen = Boolean(taggedCommentsAnchor); //Is open

	//Get Task and Comment Data
	const [taggedComments, setTaggedComments] = useState(false);
	const [tasks, setTasks] = useState(false);
	useEffect(() => {
		setTaggedComments(commentsData);
		setTasks(taskData);
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
							<IconButton color='inherit' onClick={handleAddProjectOpen}>
								<AddIcon />
							</IconButton>
						</Tooltip>
					) : null}
					<Tooltip title='Tagged comments'>
						<IconButton color='inherit' onClick={handleTaggedCommentsListOpen}>
							<Badge
								badgeContent={taggedComments ? taggedComments.length : null}
								color='secondary'
							>
								<MailIcon />
							</Badge>
						</IconButton>
					</Tooltip>
					<Tooltip title='Your tasks'>
						<IconButton color='inherit' onClick={hanleTaskListOpen}>
							<Badge badgeContent={tasks ? tasks.length : null} color='secondary'>
								<AssignmentIcon />
							</Badge>
						</IconButton>
					</Tooltip>
					<Tooltip title='Account'>
						<IconButton color='inherit' onClick={handleProfileMenuOpen}>
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
							<Typography className={classes.grow} variant='body1'>
								{userType}
							</Typography>
							<IconButton onClick={handleDrawerClose}>
								{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
							</IconButton>
						</div>
						<Divider />
						<UserOptions userType='All' />
						<Divider />
						<UserOptions userType={userType} />
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
			<NotificationList
				title={"Your tagged comments:"}
				type={"comments"}
				open={isTaggedCommentsListOpen}
				anchorElement={taggedCommentsAnchor}
				handleClose={handleTaggedCommentsListClose}
				data={taggedComments}
			/>

			{/* Tasks List */}
			<NotificationList
				title={"Your tasks:"}
				type={"tasks"}
				open={isTaskMenuOpen}
				anchorElement={tasksAnchor}
				handleClose={handleTaskListClose}
				data={tasks}
			/>
			<Toolbar style={{ marginBottom: "20px" }} />
		</div>
	);
};

Nav.propTypes = {
	showDrawer: PropTypes.bool,
	userType: PropTypes.oneOf(["Team Leader", "Client", "Developer"]),
};

export default Nav;
