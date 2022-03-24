import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

// Material-UI
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useTheme } from "@mui/material/styles";

import { NavStyles } from "../global-components/nav/navStyles";

// Custom components
import TaskTable from "./TaskTable";
import InviteUserDialog from "./dialogs/InviteUserDialog";
import AddTaskDialog from "./dialogs/AddTaskDialog";
import ManageTeamDialog from "./dialogs/ManageTeamDialog";
import SettingsDialog from "./dialogs/SettingsDialog";
import TeamMembersCard from "./TeamMembersCard";
import Page from "../global-components/Page";

import * as projectApis from "../apis/project";

import ProjectDrawer from "./drawer/ProjectDrawer";

const Projects = () => {
	const { projectId } = useParams();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.up("sm"));

	//Drawer Logic
	const [drawerOpen, setDrawerOpen] = useState(false); //State
	const handleDrawerOpen = () => setDrawerOpen(true); //Handle open
	const handleDrawerClose = () => setDrawerOpen(false); //Handle close

	// Add user dialog logic
	const [addUserAnchor, setAddUserAnchor] = useState(); //State
	const handleAddUserClose = () => setAddUserAnchor(null); //Handle close
	const isAddUserOpen = Boolean(addUserAnchor); //Is open

	// Add task dialog logic
	const [addTaskAnchor, setAddTaskAnchor] = useState(); //State
	const handleAddTaskClose = () => setAddTaskAnchor(null); //Handle close
	const isAddTaskOpen = Boolean(addTaskAnchor); //Is open

	// Manage team dialog logic
	const [manageTeamAnchor, setManageTeamAnchor] = useState(); //State
	const handleManageTeamClose = () => setManageTeamAnchor(null); //Handle close
	const isManageTeamOpen = Boolean(manageTeamAnchor); //Is open

	// Settings dialog logic
	const [settingsAnchor, setSettingsAnchor] = useState(); //State
	const handleSettingsClose = () => setSettingsAnchor(null); //Handle close
	const isSettingsOpen = Boolean(settingsAnchor); //Is open

	const dialogCallbacks = {
		handleAddUserOpen: (event) => setAddUserAnchor(event.currentTarget),
		handleAddTaskOpen: (event) => setAddTaskAnchor(event.currentTarget),
		handleManageTeamOpen: (event) => setManageTeamAnchor(event.currentTarget),
		handleSettingsOpen: (event) => setSettingsAnchor(event.currentTarget),
	};

	const { data: projectData } = useQuery("fetchProjectData", () =>
		projectApis.getProject(projectId)
	);

	const { data: invitationData } = useQuery("fetchInvitationData", () =>
		projectApis.getInvitations(projectId)
	);

	const { data: roleData } = useQuery("fetchProjectRole", () => projectApis.getRole(projectId));

	// Split project's tasks into resolved and un-resolved
	let unresolvedTasks = [];
	let resolvedTasks = [];
	if (projectData) {
		for (const task of projectData.project.tasks) {
			if (task.resolution === "Un-Resolved") unresolvedTasks.push(task);
			else resolvedTasks.push(task);
		}
	}

	const classes = NavStyles();

	if (!projectData || !invitationData || !roleData) return <Page isLoading={true} />;

	return (
		<Page drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} showDrawer={true}>
			<React.Fragment>
				<Box sx={{ display: "flex" }}>
					<ProjectDrawer
						drawerOpen={drawerOpen}
						dialogCallbacks={dialogCallbacks}
						projectId={projectId}
						role={roleData.role}
						classes={classes}
						handleDrawerClose={handleDrawerClose}
						theme={theme}
					/>

					<div className={classes.content}>
						<Typography variant='h4'>{projectData.project.title}</Typography>
						<Grid
							container
							justifyContent='center'
							style={{
								margin: 0,
								width: "100%",
							}}
						>
							<Grid item xs={12} md={8}>
								<TaskTable
									isMobile={isMobile}
									title={"Un-Resolved Tasks"}
									tasks={unresolvedTasks}
									role={roleData.role}
									projectId={projectId}
								/>
							</Grid>

							<Hidden only={["xs", "sm"]}>
								<Grid item md={1}></Grid>
							</Hidden>

							<Hidden only={["xs", "sm"]}>
								<Grid item xs={12} md={3}>
									<TeamMembersCard
										members={projectData.project.users}
										invitations={invitationData.invitations}
									/>
								</Grid>
							</Hidden>

							<Grid item xs={12} md={8}>
								<TaskTable
									isMobile={isMobile}
									title={"Resolved Tasks"}
									tasks={resolvedTasks}
									role={roleData.role}
									projectId={projectId}
								/>
							</Grid>
							<Hidden only={["xs", "sm"]}>
								<Grid item xs={4}></Grid>
							</Hidden>
						</Grid>
					</div>
				</Box>

				{/* Popup windows */}
				<AddTaskDialog
					open={isAddTaskOpen}
					handleClose={handleAddTaskClose}
					totalTasks={projectData.project.tasks.length}
					projectId={projectId}
					projectUsers={projectData.project.users}
				/>
				<InviteUserDialog
					open={isAddUserOpen}
					handleClose={handleAddUserClose}
					projectId={projectId}
					title={projectData.project.title}
				/>
				<ManageTeamDialog
					open={isManageTeamOpen}
					handleClose={handleManageTeamClose}
					projectId={projectId}
					users={projectData.project.users}
					invitations={invitationData.invitations}
					role={roleData.role}
				/>
				<SettingsDialog
					open={isSettingsOpen}
					handleClose={handleSettingsClose}
					projectId={projectId}
				/>
			</React.Fragment>
		</Page>
	);
};

export default Projects;
