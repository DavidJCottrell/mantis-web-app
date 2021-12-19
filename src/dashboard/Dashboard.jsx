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
	// const { isLoading, data } = useQuery("fetchProjects", () =>
	// 	axios.get("/project", {
	// 		headers: {
	// 			"auth-token":
	// 				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDliMWFjYzc3MWZjZDJhZWM4ZThjNmYiLCJpYXQiOjE2MjA3Nzc5MjF9.Yh0k3KVxo_3fNnEMmN9Fyk1Ku9f8D379KZ2i_6OcS64",
	// 		},
	// 	})
	// );

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
			<Container maxWidth='lg'>
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
					<Grid item xs={12} sm={6} lg={4} key={"u2hee7hd82hd82"}>
						<Card>
							<CardContent>
								<Typography variant='h5' component='h2'>
									{"Half Life 3"}
								</Typography>
								<Typography color='textSecondary'>
									{"Team Leader"}
								</Typography>
								<Typography variant='body2' component='p'>
									Tasks: {4}
								</Typography>
								<Typography variant='body2' component='p'>
									Team Size:
									{" " + 2}
								</Typography>
								<br />
								<Typography variant='body2' component='p'>
									{
										"A description of the project should go here... Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, sequi."
									}
								</Typography>
							</CardContent>
							<CardActions>
								<Link
									to='/projects'
									style={{
										textDecoration: "none",
									}}
								>
									<Button size='small'>
										Open&nbsp;<b>{"Half Life 3"}</b>
									</Button>
								</Link>
							</CardActions>
						</Card>
					</Grid>
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
