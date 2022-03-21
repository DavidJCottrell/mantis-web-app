import React, { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

// Material-UI
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";

// Custom components
import Nav from "../nav/Nav";
import TaskTable from "./TaskTable";
import InviteUserDialog from "./dialogs/InviteUserDialog";
import AddTaskDialog from "./dialogs/AddTaskDialog";
import ManageTeamDialog from "./dialogs/ManageTeamDialog";
import SettingsDialog from "./dialogs/SettingsDialog";
import TeamMembersCard from "./TeamMembersCard";

import * as projectApis from "../apis/project";

const Project = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
	const location = useLocation();

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

	// Get params passed from dashboard
	const { projectId } = (() => {
		try {
			return {
				projectId: location.state.projectId,
			};
		} catch (error) {
			window.location.replace("/");
		}
	})();

	const projectQuery = useQuery("fetchProjectData", () => projectApis.getProject(projectId));

	const invitationQuery = useQuery("fetchInvitationData", () =>
		projectApis.getInvitations(projectId)
	);

	const roleQuery = useQuery("fetchProjectRole", () =>
		projectApis.getRole(projectId, localStorage.getItem("userId"))
	);

	// Split project's tasks into resolved and un-resolved
	let unresolvedTasks = [];
	let resolvedTasks = [];
	if (projectQuery.isSuccess) {
		for (const task of projectQuery.data.project.tasks) {
			if (task.resolution === "Un-Resolved") unresolvedTasks.push(task);
			else resolvedTasks.push(task);
		}
	}

	const fullyLoaded = projectQuery.isSuccess && invitationQuery.isSuccess && roleQuery.isSuccess;

	return (
		<React.Fragment>
			{fullyLoaded ? (
				<React.Fragment>
					<Nav
						userType={roleQuery.data.role}
						showDrawer={true}
						dialogCallbacks={dialogCallbacks}
						projectId={projectId}
					>
						<Typography variant='h4'>{projectQuery.data.project.title}</Typography>
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
									role={roleQuery.data.role}
									projectId={projectId}
								/>
							</Grid>

							<Hidden only={["xs", "sm"]}>
								<Grid item md={1}></Grid>
							</Hidden>

							<Hidden only={["xs", "sm"]}>
								<Grid item xs={12} md={3}>
									<TeamMembersCard
										members={projectQuery.data.project.users}
										invitations={invitationQuery.data.invitations}
									/>
								</Grid>
							</Hidden>

							<Grid item xs={12} md={8}>
								<TaskTable
									isMobile={isMobile}
									title={"Resolved Tasks"}
									tasks={resolvedTasks}
									role={roleQuery.data.role}
									projectId={projectId}
								/>
							</Grid>
							<Hidden only={["xs", "sm"]}>
								<Grid item xs={4}></Grid>
							</Hidden>
						</Grid>
					</Nav>

					{/* Popup windows */}
					<React.Fragment>
						<AddTaskDialog
							open={isAddTaskOpen}
							handleClose={handleAddTaskClose}
							totalTasks={projectQuery.data.project.tasks.length}
							projectId={projectId}
							projectUsers={projectQuery.data.project.users}
						/>
						<InviteUserDialog
							open={isAddUserOpen}
							handleClose={handleAddUserClose}
							projectId={projectId}
							title={projectQuery.data.project.title}
						/>
						<ManageTeamDialog
							open={isManageTeamOpen}
							handleClose={handleManageTeamClose}
							projectId={projectId}
							users={projectQuery.data.project.users}
							invitations={invitationQuery.data.invitations}
							role={roleQuery.data.role}
						/>
						<SettingsDialog
							open={isSettingsOpen}
							handleClose={handleSettingsClose}
							projectId={projectId}
						/>
					</React.Fragment>
				</React.Fragment>
			) : (
				<h2>Loading project...</h2>
			)}
		</React.Fragment>
	);
};

export default Project;
