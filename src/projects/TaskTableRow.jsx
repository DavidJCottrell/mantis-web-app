import React from "react";

import { useMutation, useQueryClient } from "react-query";

// Material-UI styles
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

// Custom Components
import { taskTableRowStyles } from "./projectStyles";

import * as taskApis from "../apis/task";

const TaskTableRow = ({ task, role, isMobile, projectId, toastTaskAdded }) => {
	const [open, setOpen] = React.useState(false);
	const classes = taskTableRowStyles();

	const queryClient = new useQueryClient();

	const taskMutation = useMutation(
		({ projectId, taskId }) => taskApis.removeTask(projectId, taskId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("fetchProjectData");
				toastTaskAdded();
			},
		}
	);

	const removeTask = () => {
		if (window.confirm("Are you sure you want to delete this task?"))
			taskMutation.mutate({ projectId: projectId, taskId: task._id });
	};

	return (
		<React.Fragment>
			<TableRow className={classes.root}>
				<TableCell component='th' scope='row'>
					{task.taskKey}
				</TableCell>
				<TableCell align='left'>{task.title}</TableCell>
				{isMobile ? (
					<React.Fragment>
						<TableCell align='left'>{task.status}</TableCell>
						<TableCell align='left'>{task.resolution}</TableCell>
					</React.Fragment>
				) : null}
				<TableCell>
					<IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<br />
						<Typography variant='body1'>Task Details</Typography>

						<Box margin={2}>
							{!isMobile ? (
								<React.Fragment>
									<Typography variant='body1'>
										Status: <b>{task.status}</b>
									</Typography>
									<Typography variant='body1'>
										Resolution: <b>{task.resolution}</b>
									</Typography>
								</React.Fragment>
							) : null}

							<Typography variant='body1'>
								Reporter: <b>{task.reporter.name}</b>
							</Typography>
							{task.assignees.map((user, i) => (
								<Typography variant='body1' key={i}>
									{"Assignee " + (i + 1) + ": "} <b>{user.name}</b>
								</Typography>
							))}

							<Typography variant='body1'>
								Created: <b>{task.dateCreated}</b>
							</Typography>
							<Typography variant='body1'>
								Updated: <b>{task.dateUpdated}</b>
							</Typography>
							<Typography variant='body1'>
								Due: <b>{task.dateDue}</b>
							</Typography>
							<br />
							<Link
								to={`/projects/tasks/${task._id}/${projectId}`}
								style={{
									textDecoration: "none",
								}}
							>
								<Button variant='contained' color='secondary'>
									Open task
								</Button>
							</Link>
							<br />
							<br />
							{role === "Team Leader" ? (
								<Button variant='outlined' color='warning' onClick={removeTask}>
									Delete task
								</Button>
							) : null}
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
};

export default TaskTableRow;
