import React, { useState } from "react";

// MUI
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";

// MUI Icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import TaskList from "./lists/TaskList";
import InvitationList from "./lists/InvitationList";
import ProfileMenu from "./ProfileMenu";
import { AppBar } from "./navStyles";

const TopBar = ({
	drawerOpen,
	showDrawer,
	handleDrawerOpen,
	classes,
	invitationQuery,
	taskQuery,
	// taggedComments,
}) => {
	// Task List Logic
	const [tasksAnchor, setTasksAnchor] = useState(); //State
	const hanleTaskListOpen = (event) => setTasksAnchor(event.currentTarget); //Handle open
	const handleTaskListClose = () => setTasksAnchor(null); //Handle close
	const isTaskMenuOpen = Boolean(tasksAnchor); //Is open

	// Invitations List Logic
	const [invitationAnchor, setInvitationAnchor] = useState(); //State
	const handleInvitationListOpen = (event) => setInvitationAnchor(event.currentTarget); //Handle open
	const handleInvitationListClose = () => setInvitationAnchor(null); //Handle close
	const isInvitationMenuOpen = Boolean(invitationAnchor); //Is open

	// Comment List Logic
	const [taggedCommentsAnchor, setTaggedCommentsAnchor] = useState(); //State
	const handleTaggedCommentsListOpen = (event) =>
		setTaggedCommentsAnchor(event.currentTarget); //Handle open
	const handleTaggedCommentsListClose = () => setTaggedCommentsAnchor(null); //Handle close
	const isTaggedCommentsListOpen = Boolean(taggedCommentsAnchor); //Is open

	// Profile Menu Logic
	const [profileAnchor, setProfileAnchor] = useState(); //State
	const handleProfileMenuOpen = (event) => setProfileAnchor(event.currentTarget); //Handle open
	const handleProfileMenuClose = () => setProfileAnchor(null); //Handle close
	const isProfileMenuOpen = Boolean(profileAnchor); //Is open

	return (
		<React.Fragment>
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
					<Tooltip title='Project invitations'>
						<IconButton color='inherit' onClick={handleInvitationListOpen}>
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
							<Badge badgeContent={0} color='secondary'>
								<MailIcon />
							</Badge>
						</IconButton>
					</Tooltip>
					<Tooltip title='Your tasks'>
						<IconButton color='inherit' onClick={hanleTaskListOpen}>
							<Badge
								badgeContent={
									taskQuery.data ? taskQuery.data.length : null
								}
								color='secondary'
							>
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
			{/* ** Message list here ** */}
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
			{invitationQuery.isSuccess ? (
				<InvitationList
					open={isInvitationMenuOpen}
					anchorElement={invitationAnchor}
					handleClose={handleInvitationListClose}
					invitationData={invitationQuery.data}
				/>
			) : null}

			<ProfileMenu
				open={isProfileMenuOpen}
				anchorElement={profileAnchor}
				handleClose={handleProfileMenuClose}
			/>
		</React.Fragment>
	);
};

export default TopBar;
