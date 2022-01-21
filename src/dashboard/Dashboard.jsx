import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

// Material-UI
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

// Custom components
import Nav from "../common/nav/Nav";
import AddProjectDialog from "./AddProjectDialog";

const Dashboard = () => {
	const projects = useQuery("fetchProjects", () =>
		axios.get("http://localhost:9000/user/projects/", {
			headers: {
				"auth-token": localStorage.getItem("auth-token"),
			},
		})
	);
	if (projects.error) console.log(projects.error);

	const [addProjectOpen, setAddProjectOpen] = useState(false);

	const handleAddProjectOpen = () => {
		setAddProjectOpen(true);
	};

	const handleAddProjectClose = () => {
		setAddProjectOpen(false);
	};

	return (
		<React.Fragment>
			<Nav
				handleAddProjectOpen={handleAddProjectOpen}
				showAddProject={true}
				commentData={null}
			/>
			<Container>
				<Typography variant='h4'>
					{localStorage.getItem("fullname")}
				</Typography>
				<br />
				<Typography variant='h5'>Your Projects</Typography>
				<Box py={3}>
					<TextField
						id='outlined-basic'
						label='Search...'
						color='secondary'
					/>
				</Box>

				<Grid
					container
					spacing={3}
					style={{
						margin: 0,
						width: "100%",
					}}
					id='project-grid'
				>
					{projects.isSuccess ? (
						projects.data.data.map(({ project, role }) => (
							<Grid item xs={12} sm={6} md={4} key={project._id}>
								<Card>
									<CardContent>
										<Typography variant='h5' component='h2'>
											{project.title}
										</Typography>
										<Typography color='textSecondary'>
											Role: {role}
										</Typography>
										<br />
										<Typography
											variant='body2'
											component='p'
										>
											{project.description}
										</Typography>
										<br />
										<Typography
											variant='body2'
											component='p'
										>
											Tasks: {project.tasks.length}
										</Typography>
										<Typography
											variant='body2'
											component='p'
										>
											Team Size:
											{" " + project.users.length}
										</Typography>
									</CardContent>
									<CardActions>
										<Link
											to={"/project"}
											state={{
												projectId: project._id,
												role: role,
											}}
											style={{
												textDecoration: "none",
											}}
										>
											<Button size='small'>
												Open&nbsp;<b>{project.title}</b>
											</Button>
										</Link>
									</CardActions>
								</Card>
							</Grid>
						))
					) : (
						<h1>Loading Your Projects...</h1>
					)}
					{projects.isSuccess && projects.data.data.length === 0 ? (
						<h2>You currently have no projects</h2>
					) : null}
				</Grid>
				<br />
			</Container>
			<AddProjectDialog
				open={addProjectOpen}
				handleClose={handleAddProjectClose}
			/>
		</React.Fragment>
	);
};

export default Dashboard;
