import React, { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

// Material-UI
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";

// Custom components
import Nav from "../nav/Nav";
import TaskTable from "./TaskTable";
import InviteUserDialog from "./dialogs/InviteUserDialog";
import AddTaskDialog from "./dialogs/AddTaskDialog";
import ManageTeamDialog from "./dialogs/ManageTeamDialog";
import SettingsDialog from "./dialogs/SettingsDialog";
import TeamMembersCard from "./TeamMembersCard";

import toast, { Toaster } from "react-hot-toast";

import * as projectApis from "../apis/project";

const Project = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.up("sm"));

	const location = useLocation();
	const state = location.state;

	// Add user dialog logic
	const [addUserAnchor, setAddUserAnchor] = useState(); //State
	const handleAddUserOpen = (event) => setAddUserAnchor(event.currentTarget); //Handle open
	const handleAddUserClose = () => setAddUserAnchor(null); //Handle close
	const isAddUserOpen = Boolean(addUserAnchor); //Is open

	// Add task dialog logic
	const [addTaskAnchor, setAddTaskAnchor] = useState(); //State
	const handleAddTaskOpen = (event) => setAddTaskAnchor(event.currentTarget); //Handle open
	const handleAddTaskClose = () => setAddTaskAnchor(null); //Handle close
	const isAddTaskOpen = Boolean(addTaskAnchor); //Is open

	// Manage team dialog logic
	const [manageTeamAnchor, setManageTeamAnchor] = useState(); //State
	const handleManageTeamOpen = (event) => setManageTeamAnchor(event.currentTarget); //Handle open
	const handleManageTeamClose = () => setManageTeamAnchor(null); //Handle close
	const isManageTeamOpen = Boolean(manageTeamAnchor); //Is open

	// Settings dialog logic
	const [settingsAnchor, setSettingsAnchor] = useState(); //State
	const handleSettingsOpen = (event) => setSettingsAnchor(event.currentTarget); //Handle open
	const handleSettingsClose = () => setSettingsAnchor(null); //Handle close
	const isSettingsOpen = Boolean(settingsAnchor); //Is open

	const removeUserComplete = () => toast.success("User removed!");
	const removeInvitationComplete = () => toast.success("Invitation removed!");
	const removeTaskComplete = () => toast.success("Task removed!");
	const addTaskComplete = () => toast.success("Added task!");

	// Get params passed from dashboard
	const { projectId } = (() => {
		try {
			return {
				projectId: state.projectId,
			};
		} catch (error) {
			window.location.replace("/");
		}
	})();

	const projectQuery = useQuery("fetchProjectData", () =>
		projectApis.getProject(projectId)
	);

	const invitationQuery = useQuery("fetchInvitationData", () =>
		projectApis.getInvitations(projectId)
	);

	const roleQuery = useQuery("fetchProjectRole", () =>
		projectApis.getRole(projectId, localStorage.getItem("userId"))
	);

	const fullyLoaded =
		projectQuery.isSuccess && invitationQuery.isSuccess && roleQuery.isSuccess;

	const projectCallbacks = {
		handleAddUserOpen: handleAddUserOpen,
		handleAddTaskOpen: handleAddTaskOpen,
		handleManageTeamOpen: handleManageTeamOpen,
		handleSettingsOpen: handleSettingsOpen,
	};

	return (
		<React.Fragment>
			{fullyLoaded ? (
				<React.Fragment>
					<Toaster />
					<Nav
						userType={roleQuery.data.role}
						showDrawer={true}
						projectCallbacks={projectCallbacks}
					>
						<Grid
							container
							justifyContent='center'
							style={{
								margin: 0,
								width: "100%",
							}}
						>
							<React.Fragment>
								<TaskTable
									isMobile={isMobile}
									projectData={projectQuery.data.project}
									role={roleQuery.data.role}
									projectId={projectId}
									removeTaskComplete={removeTaskComplete}
								/>

								<Hidden only={["xs", "sm"]}>
									<Grid item md={1}></Grid>
								</Hidden>

								<TeamMembersCard
									projectQuery={projectQuery}
									invitationQuery={invitationQuery}
								/>
							</React.Fragment>
						</Grid>
					</Nav>

					{/* Popup windows */}
					<React.Fragment>
						<AddTaskDialog
							open={isAddTaskOpen}
							handleClose={handleAddTaskClose}
							totalTasks={projectQuery.data.project.tasks.length}
							projectId={projectId}
							addTaskComplete={addTaskComplete}
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
							removeUserComplete={removeUserComplete}
							removeInvitationComplete={removeInvitationComplete}
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
