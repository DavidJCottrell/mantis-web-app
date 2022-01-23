import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

// Material-UI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Hidden from "@mui/material/Hidden";

// Custom components
import Nav from "../common/nav/Nav";
import TaskTableRow from "./TaskTableRow";
import TaskTable from "./TaskTable";
import AddUserDialog from "./AddUserDialog";
import AddTaskDialog from "./AddTaskDialog";
import ManageTeamDialog from "./ManageTeamDialog";

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
	const handleManageTeamOpen = (event) =>
		setManageTeamAnchor(event.currentTarget); //Handle open
	const handleManageTeamClose = () => setManageTeamAnchor(null); //Handle close
	const isManageTeamOpen = Boolean(manageTeamAnchor); //Is open

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

	const projectData = useQuery("fetchProjectData", () =>
		axios.get(
			process.env.REACT_APP_BASE_URL + "/project/" + String(projectId),
			{
				headers: {
					"auth-token": localStorage.getItem("auth-token"),
				},
			}
		)
	);

	let totalTasks = 0;
	if (projectData.isSuccess)
		totalTasks = projectData.data.data.project.tasks.length;

	const invitationData = useQuery("fetchInvitationData", () =>
		axios.get(
			process.env.REACT_APP_BASE_URL +
				"/project/invitations/" +
				String(projectId),
			{
				headers: {
					"auth-token": localStorage.getItem("auth-token"),
				},
			}
		)
	);
	if (invitationData.error) console.log("Error loading invitations");

	const fullyLoaded = projectData.isSuccess && invitationData.isSuccess;

	return (
		<React.Fragment>
			<Nav
				userType={role}
				showDrawer={true}
				showAddProject={false}
				handleAddUserOpen={handleAddUserOpen}
				handleAddTaskOpen={handleAddTaskOpen}
				handleManageTeamOpen={handleManageTeamOpen}
			>
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
								projectData={projectData.data.data.project}
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

											{projectData.data.data.project.users.map(
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
												{invitationData.data.data.invitations.map(
													(invitation, i) => (
														<li key={i}>
															{invitation.invitee
																.name +
																" (" +
																invitation
																	.invitee
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
						projectId={projectId}
						totalTasks={totalTasks}
					/>
					<AddUserDialog
						open={isAddUserOpen}
						anchorElement={addUserAnchor}
						handleClose={handleAddUserClose}
						projectId={projectId}
						title={projectData.data.data.project.title}
					/>
					<ManageTeamDialog
						open={isManageTeamOpen}
						anchorElement={manageTeamAnchor}
						handleClose={handleManageTeamClose}
						projectId={projectId}
						title={projectData.data.data.project.title}
						users={projectData.data.data.project.users}
					/>
				</React.Fragment>
			) : null}
		</React.Fragment>
	);
};

export default Projects;
