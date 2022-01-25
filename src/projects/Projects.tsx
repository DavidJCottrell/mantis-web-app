import React, { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

// Material-UI
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Hidden from "@mui/material/Hidden";

// Custom components
import Nav from "../nav/Nav";
import TaskTable from "./TaskTable";
import InviteUserDialog from "./dialogs/InviteUserDialog";
import AddTaskDialog from "./dialogs/AddTaskDialog";
import ManageTeamDialog from "./dialogs/ManageTeamDialog";

import toast, { Toaster } from "react-hot-toast";

import * as projectApis from "../apis/project";

const Projects = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.up("sm"));
	const location = useLocation();

	// Add User Logic
	const [addUserAnchor, setAddUserAnchor] = useState(); //State
	const handleAddUserOpen = (event) => setAddUserAnchor(event.currentTarget); //Handle open
	const handleAddUserClose = () => setAddUserAnchor(null); //Handle close
	const isAddUserOpen = Boolean(addUserAnchor); //Is open

	// Add Task Logic
	const [addTaskAnchor, setAddTaskAnchor] = useState(); //State
	const handleAddTaskOpen = (event) => setAddTaskAnchor(event.currentTarget); //Handle open
	const handleAddTaskClose = () => setAddTaskAnchor(null); //Handle close
	const isAddTaskOpen = Boolean(addTaskAnchor); //Is open

	// Manage Team Logic
	const [manageTeamAnchor, setManageTeamAnchor] = useState(); //State
	const handleManageTeamOpen = (event) => setManageTeamAnchor(event.currentTarget); //Handle open
	const handleManageTeamClose = () => setManageTeamAnchor(null); //Handle close
	const isManageTeamOpen = Boolean(manageTeamAnchor); //Is open

	const removeUserComplete = () => toast.success("User removed!");
	const removeInvitationComplete = () => toast.success("Invitation removed!");
	const removeTaskComplete = () => toast.success("Task removed!");
	const addTaskComplete = () => toast.success("Added task!");

	// Get params passed from dashboard
	const { role, projectId } = (() => {
		try {
			return {
				role: location.state.role,
				projectId: location.state.projectId,
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

	const fullyLoaded = projectQuery.isSuccess && invitationQuery.isSuccess;

	const projectCallbacks = {
		handleAddUserOpen: handleAddUserOpen,
		handleAddTaskOpen: handleAddTaskOpen,
		handleManageTeamOpen: handleManageTeamOpen,
	};

	return (
		<React.Fragment>
			<Toaster />
			<Nav userType={role} showDrawer={true} projectCallbacks={projectCallbacks}>
				<Grid
					container
					justifyContent='center'
					style={{
						margin: 0,
						width: "100%",
					}}
				>
					{/* Tasks grid */}
					{fullyLoaded ? (
						<React.Fragment>
							<TaskTable
								isMobile={isMobile}
								projectData={projectQuery.data.project}
								role={role}
								projectId={projectId}
								removeTaskComplete={removeTaskComplete}
							/>

							{/* Gap between tasks and members card */}
							<Hidden only={["xs", "sm"]}>
								<Grid item md={1}></Grid>
							</Hidden>

							{/* Team Members Card (desktop only) */}
							<Hidden only={["xs", "sm"]}>
								<Grid item xs={12} md={3}>
									<br />
									<Card>
										<CardContent>
											<Typography
												variant='h5'
												component='h2'
												gutterBottom
											>
												Team Members
											</Typography>

											{projectQuery.data.project.users.map(
												(user, i) => (
													<React.Fragment key={i}>
														<Typography
															variant='subtitle1'
															component='h2'
														>
															{user.role + "s"}
														</Typography>
														<ul>
															<li key={i}>
																{user.name +
																	" (" +
																	user.username +
																	")"}
															</li>
														</ul>
													</React.Fragment>
												)
											)}

											<Typography
												variant='subtitle1'
												component='h2'
											>
												Invited
											</Typography>

											<ul>
												{invitationQuery.data.invitations.map(
													(invitation, i) => (
														<li key={i}>
															{invitation.invitee.name +
																" (" +
																invitation.invitee
																	.username +
																") - " +
																invitation.role}
														</li>
													)
												)}
											</ul>
										</CardContent>
									</Card>
								</Grid>
							</Hidden>
						</React.Fragment>
					) : (
						<h1>Loading project...</h1>
					)}
				</Grid>
				{/* More Stuff */}
			</Nav>

			{/* Popup windows */}
			{fullyLoaded ? (
				<React.Fragment>
					<AddTaskDialog
						open={isAddTaskOpen}
						anchorElement={addTaskAnchor}
						handleClose={handleAddTaskClose}
						totalTasks={projectQuery.data.project.tasks.length}
						projectId={projectId}
						addTaskComplete={addTaskComplete}
					/>
					<InviteUserDialog
						open={isAddUserOpen}
						anchorElement={addUserAnchor}
						handleClose={handleAddUserClose}
						projectId={projectId}
						title={projectQuery.data.project.title}
					/>
					<ManageTeamDialog
						open={isManageTeamOpen}
						anchorElement={manageTeamAnchor}
						handleClose={handleManageTeamClose}
						projectId={projectId}
						users={projectQuery.data.project.users}
						invitations={invitationQuery.data.invitations}
						removeUserComplete={removeUserComplete}
						removeInvitationComplete={removeInvitationComplete}
					/>
				</React.Fragment>
			) : null}
		</React.Fragment>
	);
};

export default Projects;
