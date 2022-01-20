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
// import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";

// Custom components
// import ProjectNav from "./nav/ProjectsNav";
import Nav from "../common/nav/Nav";
import TaskTableRow from "./TaskTableRow";
import AddUserDialog from "./AddUserDialog";
import AddTaskDialog from "./AddTaskDialog";

const Projects = (props) => {
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

	const { isSuccess, error, data } = useQuery("fetchProjectData", () =>
		axios.get("http://localhost:9000/project/" + String(projectId), {
			headers: {
				"auth-token": localStorage.getItem("auth-token"),
			},
		})
	);

	let totalTasks = 0;
	if (error) console.log("Error loading project");
	if (isSuccess) totalTasks = data.data.project.tasks.length;

	return (
		<React.Fragment>
			<Nav
				userType={role}
				showDrawer={true}
				handleAddUserOpen={handleAddUserOpen}
				handleAddTaskOpen={handleAddTaskOpen}
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
					{isSuccess ? (
						<Grid item xs={12} md={8}>
							<Typography variant='h4'>
								{data.data.project.title}
							</Typography>
							<br />
							<TableContainer component={Paper}>
								<Table aria-label='collapsible table'>
									<TableHead>
										<TableRow>
											<TableCell>Key</TableCell>
											<TableCell align='left'>
												Title
											</TableCell>
											{isMobile ? (
												<React.Fragment>
													<TableCell align='left'>
														Status
													</TableCell>
													<TableCell align='left'>
														Resolution
													</TableCell>
												</React.Fragment>
											) : null}
											<TableCell />
										</TableRow>
									</TableHead>
									<TableBody>
										{data.data.project.tasks.map((task) => (
											<TaskTableRow
												key={task.taskKey}
												task={task}
												isMobile={isMobile}
											/>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
					) : (
						<h1>Loading Project Data...</h1>
					)}
					{/* Gap between tasks and members card */}
					<Hidden only={["xs", "sm"]}>
						<Grid item md={1}></Grid>
					</Hidden>
					{/* Team Members Card (desktop only) */}
					{isSuccess ? (
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

										<Typography
											variant='subtitle1'
											component='h2'
										>
											Team Leaders
										</Typography>
										<ul>
											{data.data.project.users.map(
												(person, i) =>
													person.role ===
													"Team Leader" ? (
														<li key={i}>
															{person.name +
																" (" +
																person.username +
																")"}
														</li>
													) : null
											)}
										</ul>
										<Typography
											variant='subtitle1'
											component='h2'
										>
											Developers
										</Typography>
										<ul>
											{data.data.project.users.map(
												(person, i) =>
													person.role ===
													"Developer" ? (
														<li key={i}>
															{person.name +
																" (" +
																person.username +
																")"}
														</li>
													) : null
											)}
										</ul>

										<Typography
											variant='subtitle1'
											component='h2'
										>
											Clients
										</Typography>

										<ul>
											{data.data.project.users.map(
												(person, i) =>
													person.role === "Client" ? (
														<li key={i}>
															{person.name +
																" (" +
																person.username +
																")"}
														</li>
													) : null
											)}
										</ul>
									</CardContent>
								</Card>
							</Grid>
						</Hidden>
					) : null}
				</Grid>
				{/* More Stuff */}
			</Nav>
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
			/>
		</React.Fragment>
	);
};

export default Projects;
