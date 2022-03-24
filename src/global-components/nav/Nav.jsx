import React, { useState } from "react";
import { useQuery } from "react-query";

//Material-UI Components
import Box from "@mui/material/Box";

import * as userApis from "../../apis/user";
import { NavStyles } from "./navStyles";

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
import TaskCommentsList from "./lists/TaskCommentsList";
import InvitationList from "./lists/InvitationList";
import ProfileMenu from "./ProfileMenu";
import { AppBar } from "./navStyles";

const Nav = ({ drawerOpen, handleDrawerOpen, showDrawer }) => {
	const classes = NavStyles();

	const { data: taskData } = useQuery("fetchUsersTasks", userApis.getTasks);

	const { data: invitationData } = useQuery("fetchUsersInvitations", userApis.getInvitations);

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
	const [commentsAnchor, setCommentsAnchor] = useState(); //State
	const handleCommentsListOpen = (event) => setCommentsAnchor(event.currentTarget); //Handle open
	const handleCommentsListClose = () => setCommentsAnchor(null); //Handle close
	const isCommentsListOpen = Boolean(commentsAnchor); //Is open

	// Profile Menu Logic
	const [profileAnchor, setProfileAnchor] = useState(); //State
	const handleProfileMenuOpen = (event) => setProfileAnchor(event.currentTarget); //Handle open
	const handleProfileMenuClose = () => setProfileAnchor(null); //Handle close
	const isProfileMenuOpen = Boolean(profileAnchor); //Is open

	// console.log(taskData);

	// Extract comments from each task
	let comments = [];
	if (taskData) {
		for (const task of taskData) {
			for (const comment of task.task.comments) {
				comments.push({
					parentTask: task.task,
					parentProject: {
						title: task.parentProjectTitle,
						id: task.parentProjectId,
					},
					content: comment.content,
					author: comment.authorName,
				});
			}
		}
	}

	return (
		<Box sx={{ display: "flex" }} style={{ marginBottom: "90px" }}>
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
								badgeContent={invitationData ? invitationData.length : null}
								color='secondary'
							>
								<AddCircleIcon />
							</Badge>
						</IconButton>
					</Tooltip>
					<Tooltip title='Tagged comments'>
						<IconButton color='inherit' onClick={handleCommentsListOpen}>
							<Badge badgeContent={comments.length} color='secondary'>
								<MailIcon />
							</Badge>
						</IconButton>
					</Tooltip>
					<Tooltip title='Your tasks'>
						<IconButton color='inherit' onClick={hanleTaskListOpen}>
							<Badge
								badgeContent={taskData ? taskData.length : null}
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
			{taskData ? (
				<React.Fragment>
					<TaskCommentsList
						title={"Task comments:"}
						open={isCommentsListOpen}
						anchorElement={commentsAnchor}
						handleClose={handleCommentsListClose}
						comments={comments}
					/>
					<TaskList
						title={"Your tasks:"}
						open={isTaskMenuOpen}
						anchorElement={tasksAnchor}
						handleClose={handleTaskListClose}
						tasks={taskData}
					/>
				</React.Fragment>
			) : null}
			{invitationData ? (
				<InvitationList
					open={isInvitationMenuOpen}
					anchorElement={invitationAnchor}
					handleClose={handleInvitationListClose}
					invitationData={invitationData}
				/>
			) : null}

			<ProfileMenu
				open={isProfileMenuOpen}
				anchorElement={profileAnchor}
				handleClose={handleProfileMenuClose}
			/>
		</Box>
	);
};

export default Nav;
