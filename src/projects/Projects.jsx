import React from "react";

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
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";

// Custom components
// import ProjectNav from "./nav/ProjectsNav";
import Nav from "../common/nav/Nav";
import TaskTableRow from "./TaskTableRow";

const Projects = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.up("sm"));

	const taskData = [
		{
			taskKey: "T1",
			title: "Login Bug",
			status: "In-progress",
			resolution: "Unresolved",
			type: "Bug",
		},
		{
			taskKey: "T2",
			title: "Level 2 Issue",
			status: "In-progress",
			resolution: "Unresolved",
			type: "Bug",
		},
		{
			taskKey: "T3",
			title: "Customer API Route",
			status: "In-progress",
			resolution: "Unresolved",
			type: "New Feature",
		},
		{
			taskKey: "T4",
			title: "Item Menu Sort Option",
			status: "In-progress",
			resolution: "Unresolved",
			type: "System Improvement",
		},
		{
			taskKey: "T5",
			title: "About Page",
			status: "In-progress",
			resolution: "Unresolved",
			type: "New Feature",
		},
	];

	const teamData = {
		TeamLeaders: ["Bob Smith", "Jim Jones"],
		Developers: ["Adam White", "Chris Martin", "James White"],
		Clients: ["Edd Gordon", "Kyle Jones", "Jimmy Wozniak"],
	};

	return (
		<div>
			<Nav userType='Team Leader' showDrawer={true}>
				<Grid
					container
					justify='center'
					style={{
						margin: 0,
						width: "100%",
					}}
				>
					{/* Tasks grid */}
					<Grid item xs={12} md={8}>
						<Typography variant='h4'>Half Life 3</Typography>
						<br />
						<TableContainer component={Paper}>
							<Table aria-label='collapsible table'>
								<TableHead>
									<TableRow>
										<TableCell>Key</TableCell>
										<TableCell align='left'>Title</TableCell>
										{isMobile ? (
											<React.Fragment>
												<TableCell align='left'>Status</TableCell>
												<TableCell align='left'>Resolution</TableCell>
											</React.Fragment>
										) : null}
										<TableCell />
									</TableRow>
								</TableHead>
								<TableBody>
									{taskData.map((task) => (
										<TaskTableRow key={task.taskKey} row={task} isMobile={isMobile} />
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
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
									<Typography variant='h5' component='h2' gutterBottom>
										Team Members
									</Typography>

									<Typography variant='subtitle1' component='h2'>
										Team Leaders
									</Typography>
									<ul>
										{teamData.TeamLeaders.map((person, i) => (
											<li key={i}>{person}</li>
										))}
									</ul>
									<Typography variant='subtitle1' component='h2'>
										Developers
									</Typography>
									<ul>
										{teamData.Developers.map((person, i) => (
											<li key={i}>{person}</li>
										))}
									</ul>

									<Typography variant='subtitle1' component='h2'>
										Clients
									</Typography>

									<ul>
										{teamData.Clients.map((person, i) => (
											<li key={i}>{person}</li>
										))}
									</ul>

									<br />
									<Button variant='contained' color='secondary'>
										Add users
									</Button>
								</CardContent>
							</Card>
						</Grid>
					</Hidden>
				</Grid>
				{/* More Stuff */}
			</Nav>
		</div>
	);
};

export default Projects;
