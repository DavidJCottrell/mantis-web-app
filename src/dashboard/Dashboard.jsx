import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

// Material-UI
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

// Custom components
import Nav from "../common/nav/Nav";
import AddProjectDialog from "./AddProjectDialog";

const Dashboard = () => {
	const projects = useQuery("fetchProjects", () =>
		axios.get("http://192.168.0.98:9000/user/projects/", {
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
			<Nav handleAddProjectOpen={handleAddProjectOpen} />
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
											Tasks: {project.tasks.length}
										</Typography>
										<Typography
											variant='body2'
											component='p'
										>
											Team Size:
											{" " + project.users.length}
										</Typography>
										<br />
										<Typography
											variant='body2'
											component='p'
										>
											{project.description}
										</Typography>
									</CardContent>
									<CardActions>
										<Link
											to={{
												pathname: "/projects",
												state: {
													projectId: project._id,
													role: role,
												},
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
