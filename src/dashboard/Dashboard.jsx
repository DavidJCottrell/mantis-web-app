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
	const { isLoading, error, data } = useQuery("fetchProjects", () =>
		axios.get("http://192.168.0.98:9000/project/all/", {
			headers: {
				"auth-token": localStorage.getItem("auth-token"),
			},
		})
	);

	// NEEDS TO HANDLE ERRORS

	const [addProjectOpen, setAddProjectOpen] = useState(false);

	const handleAddProjectOpen = () => {
		setAddProjectOpen(true);
	};

	const handleAddProjectClose = () => {
		console.log("Token: ", localStorage.getItem("token"));
		setAddProjectOpen(false);
	};

	return (
		<React.Fragment>
			<Nav handleAddProjectOpen={handleAddProjectOpen} />
			<Container>
				<Typography variant='h4'>Projects</Typography>
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
				>
					{isLoading ? (
						<h1>Loading</h1>
					) : error ? (
						<h1>Error loading projects</h1>
					) : (
						data.data.map((project) => (
							<Grid item xs={12} sm={6} md={4} key={project._id}>
								<Card>
									<CardContent>
										<Typography variant='h5' component='h2'>
											{project.title}
										</Typography>
										<Typography color='textSecondary'>
											{project.role}
										</Typography>
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
											// to='/projects'
											to={{
												pathname: "/projects",
												state: { _id: project._id },
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
					)}
				</Grid>
			</Container>
			<AddProjectDialog
				open={addProjectOpen}
				handleClose={handleAddProjectClose}
			/>
		</React.Fragment>
	);
};

export default Dashboard;
