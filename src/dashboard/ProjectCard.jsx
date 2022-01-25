import React from "react";
import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const ProjectCard = ({ project, role }) => {
	return (
		<Grid item xs={12} sm={6} md={4} key={project._id}>
			<Card>
				<CardContent>
					<Typography variant='h5' component='h2'>
						{project.title}
					</Typography>
					<Typography color='textSecondary'>Role: {role}</Typography>
					<br />
					<Typography variant='body2' component='p'>
						{project.description}
					</Typography>
					<br />
					<Typography variant='body2' component='p'>
						Tasks: {project.tasks.length}
					</Typography>
					<Typography variant='body2' component='p'>
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
							Open&nbsp;
							<b>{project.title}</b>
						</Button>
					</Link>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default ProjectCard;
