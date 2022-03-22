import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

const ProjectCard = ({ project, role, cardStyle }) => {
	// Split tasks into resolved and un-resolved
	let unresolvedTasks = [];
	let resolvedTasks = [];
	for (const task of project.tasks) {
		if (task.resolution === "Un-Resolved") unresolvedTasks.push(task);
		else resolvedTasks.push(task);
	}

	// Calculate the percentage towards completion
	let percentageComplete = Math.round((resolvedTasks.length / project.tasks.length) * 100);
	if (Number.isNaN(percentageComplete)) percentageComplete = 0;

	return (
		<Grid item xs={12} sm={6} md={4} key={project._id}>
			<Card style={cardStyle}>
				<CardContent>
					<Typography variant='h5' component='h2'>
						{project.title}
					</Typography>
					<Typography color='textSecondary'>Role: {role}</Typography>

					<Typography variant='body2' component='p' gutterBottom>
						{project.description}
					</Typography>
					<br />
					<Typography variant='body2' component='p' gutterBottom>
						Un-Resolved Tasks: {unresolvedTasks.length}
					</Typography>
					<Typography variant='body2' component='p' gutterBottom>
						Resolved Tasks: {resolvedTasks.length}
					</Typography>
					<Typography variant='body2' component='p' gutterBottom>
						Team Size:
						{" " + project.users.length}
					</Typography>
					<br />
					<Typography variant='body2' component='p' gutterBottom>
						Percentage to Completion:
					</Typography>
					<Box sx={{ width: "100%", mr: 1 }}>
						<LinearProgress variant='determinate' value={percentageComplete} />
						<Typography
							variant='body1'
							component='p'
							gutterBottom
							style={{ textAlign: "center" }}
						>
							{percentageComplete}%
						</Typography>
					</Box>
				</CardContent>
				<CardActions>
					<Link to={`/project/${project._id}`} style={{ textDecoration: "none" }}>
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
