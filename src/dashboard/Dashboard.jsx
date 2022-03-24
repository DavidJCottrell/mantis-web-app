import React, { useState } from "react";
import { useQuery } from "react-query";

// MUI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// APIs
import * as userApis from "../apis/user";

// Custom components
import AddProjectDialog from "./AddProjectDialog";
import AddProjectCard from "./AddProjectCard";
import ProjectCard from "./ProjectCard";

import Page from "../global-components/Page";

const Dashboard = () => {
	// Fetch the projects the user belongs to
	const { data: projectData } = useQuery("getUserProjects", userApis.getUserProjects);

	// Add project dialog logic
	const [addProjectOpen, setAddProjectOpen] = useState(false);
	const handleAddProjectOpen = () => setAddProjectOpen(true);
	const handleAddProjectClose = () => setAddProjectOpen(false);

	//Wait for API to fetch data before rendering
	if (!projectData) return <Page isLoading={true} />;
	return (
		<Page>
			<React.Fragment>
				<Container>
					<Typography variant='h4'>{localStorage.getItem("fullName")}</Typography>

					<br />
					<Typography variant='h5'>Your Projects</Typography>
					<br />

					<Grid container spacing={3} id='project-grid'>
						{projectData.map(({ project, role }, i) => (
							<ProjectCard project={project} role={role} key={i} />
						))}
						<AddProjectCard handleAddProjectOpen={handleAddProjectOpen} />
					</Grid>

					{projectData.length === 0 ? <h2>You currently have no projects</h2> : null}

					<br />
				</Container>

				<AddProjectDialog open={addProjectOpen} handleClose={handleAddProjectClose} />
			</React.Fragment>
		</Page>
	);
};
export default Dashboard;
