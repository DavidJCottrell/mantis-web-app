import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

// Material-UI
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
// import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";

// Custom components
// import ProjectNav from "./nav/ProjectsNav";
import Nav from "../common/nav/Nav";
import TaskTableRow from "./TaskTableRow";
import AddUserDialog from "./AddUserDialog";

const Projects = (props) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.up("sm"));

	// Add User Logic
	const [addUserAnchor, setAddUserAnchor] = useState(); //State
	const handleAddUserOpen = (event) => setAddUserAnchor(event.currentTarget); //Handle open
	const handleAddUserClose = () => setAddUserAnchor(null); //Handle close
	const isAddUserOpen = Boolean(addUserAnchor); //Is open

	const role = props.location.state.role;

	let projectId;

	// if the page was navigated manually (without passing it an id)
	try {
		projectId = props.location.state.projectId;
	} catch (error) {
		// go back to dashboard
		window.location.replace("/");
	}

	const { isSuccess, error, data } = useQuery("fetchProjectData", () =>
		axios.get("http://192.168.0.98:9000/project/" + String(projectId), {
			headers: {
				"auth-token": localStorage.getItem("auth-token"),
			},
		})
	);

	if (error) console.log("Error loading project");

	return (
		<React.Fragment>
			<Nav
				userType={role}
				showDrawer={true}
				handleAddUserOpen={handleAddUserOpen}
			>
				<Grid
					container
					justify='center'
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
												row={task}
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
															{person.name}
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
															{person.name}
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
															{person.name}
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
