import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

// Material-UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import toast, { Toaster } from "react-hot-toast";

import * as userApis from "../apis/user";
import * as projectApis from "../apis/project";

// Custom components
import Nav from "../common/nav/Nav";
import AddProjectDialog from "./AddProjectDialog";
import ProjectCard from "./ProjectCard";

const Dashboard = () => {
	const queryClient = new useQueryClient();

	const projectQuery = useQuery("fetchProjects", userApis.getProjectsData);

	const { mutate } = useMutation(projectApis.addProject, {
		onSuccess: () => {
			queryClient.invalidateQueries("fetchProjects");
		},
	});

	const handleAddProject = (e) => {
		e.preventDefault();
		const data = {
			title: document.getElementsByName("title")[0].value,
			users: [],
			tasks: [],
			githubURL: document.getElementsByName("githubURL")[0].value,
			description: document.getElementsByName("description")[0].value,
		};
		mutate(data);
		toast.success("Project added!");
		handleAddProjectClose();
	};

	// Add project dialog logic
	const [addProjectOpen, setAddProjectOpen] = useState(false);
	const handleAddProjectOpen = () => setAddProjectOpen(true);
	const handleAddProjectClose = () => setAddProjectOpen(false);

	return (
		<React.Fragment>
			<Toaster />
			<Nav
				handleAddProjectOpen={handleAddProjectOpen}
				showAddProject={true}
				commentData={null}
			/>
			<Container>
				<Typography variant='h4'>
					{localStorage.getItem("fullName")}
				</Typography>

				<br />
				<Typography variant='h5'>Your Projects</Typography>
				<br />

				<Grid container spacing={3} id='project-grid'>
					{projectQuery.data?.map(({ project, role }, i) => (
						<ProjectCard project={project} role={role} key={i} />
					))}
				</Grid>

				{projectQuery.isLoading ? <h2>Loading projects...</h2> : null}

				{projectQuery.isSuccess && projectQuery.data.length === 0 ? (
					<h2>You currently have no projects</h2>
				) : null}

				<br />
			</Container>
			<AddProjectDialog
				open={addProjectOpen}
				handleClose={handleAddProjectClose}
				handleAddProject={handleAddProject}
			/>
		</React.Fragment>
	);
};

export default Dashboard;
