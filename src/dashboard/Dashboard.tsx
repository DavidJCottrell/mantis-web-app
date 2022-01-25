import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

// MUI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import toast, { Toaster } from "react-hot-toast";

import * as userApis from "../apis/user";
import * as projectApis from "../apis/project";

// Custom components
import Nav from "../nav/Nav";
import AddProjectDialog from "./AddProjectDialog";
import AddProjectCard from "./AddProjectCard";
import ProjectCard from "./ProjectCard";

const Dashboard = () => {
	const queryClient = useQueryClient();

	const projectQuery = useQuery("fetchProjects", userApis.getProjectsData);

	const projectMutation = useMutation(projectApis.addProject, {
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
		projectMutation.mutate(data);
		toast.success("Project added!");
		handleAddProjectClose();
	};

	// Add project dialog logic
	const [addProjectOpen, setAddProjectOpen] = useState(false);
	const handleAddProjectOpen = () => setAddProjectOpen(true);
	const handleAddProjectClose = () => setAddProjectOpen(false);

	const cardStyle = {
		minHeight: "250px",
	};

	return (
		<React.Fragment>
			<Toaster />
			<Nav commentData={null} />
			<Container>
				<Typography variant='h4'>{localStorage.getItem("fullName")}</Typography>

				<br />
				<Typography variant='h5'>Your Projects</Typography>
				<br />

				{projectQuery.isSuccess ? (
					<Grid container spacing={3} id='project-grid'>
						{projectQuery.data?.map(({ project, role }, i) => (
							<ProjectCard
								project={project}
								role={role}
								key={i}
								cardStyle={cardStyle}
							/>
						))}
						<AddProjectCard
							cardStyle={cardStyle}
							handleAddProjectOpen={handleAddProjectOpen}
						/>
					</Grid>
				) : (
					<h2>Loading projects...</h2>
				)}

				{projectMutation.isLoading ? <h2>Loading new project...</h2> : null}

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
