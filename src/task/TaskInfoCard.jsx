import React from "react";

// Material-UI
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const TaskInfoCard = ({ task, currentUserIsAssigned }) => {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
					Task Information
				</Typography>
				<Grid container spacing={5}>
					<Grid item xs={12} md={6}>
						<Typography variant='body1'>Assignees</Typography>
						<ul>
							{task.assignees.map((assignee, i) => (
								<li key={i}>{assignee.name}</li>
							))}
						</ul>
						<Typography variant='body1'>Dates</Typography>
						<ul>
							<li>
								<Typography variant='body2'>
									Date Created: {task.dateCreated}
								</Typography>
							</li>
							<li>
								<Typography variant='body2'>Due Date: {task.dateDue}</Typography>
							</li>
						</ul>
						<Typography variant='body1'>Status</Typography>
						<ul>
							<li>
								<Typography variant='body2'>Status: {task.status}</Typography>
							</li>
							<li>
								<Typography variant='body2'>
									Resolution: {task.resolution}
								</Typography>
							</li>
						</ul>
					</Grid>

					<Grid item xs={12} md={6}>
						<Typography variant='body1'>Reporter</Typography>
						<ul>
							<li>
								<Typography variant='body2'>{task.reporter.name}</Typography>
							</li>
						</ul>
						<Typography variant='body1'>Description</Typography>
						<ul>
							<li>
								<Typography variant='body2'>Task Type: {task.type}</Typography>
							</li>
							<li>
								<Typography variant='body2'>
									{task.description ? task.description : "No Description"}
								</Typography>
							</li>
						</ul>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions>
				{currentUserIsAssigned ? <Button size='small'>Edit</Button> : null}
			</CardActions>
		</Card>
	);
};

export default TaskInfoCard;
