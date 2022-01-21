import React from "react";

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
import axios from "axios";
import { Link } from "react-router-dom";

// Custom Components
import { taskTableRowStyles } from "./projectStyles";

const TaskTableRow = ({ task, role, projectId, isMobile }) => {
	const [open, setOpen] = React.useState(false);
	const classes = taskTableRowStyles();

	const handleDelete = () => {
		if (window.confirm("Are you sure you want to delete this task?")) {
			const config = {
				method: "patch",
				url:
					"http://localhost:9000/project/" +
					String(projectId) +
					"/" +
					String(task._id),
				headers: { "auth-token": localStorage.getItem("auth-token") },
			};

			axios(config)
				.then((res) => {
					window.location.reload();
				})
				.catch((err) => {
					console.log(err);
				});
		}
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
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
				>
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
									{"Assignee " + (i + 1) + ": "}{" "}
									<b>{user.name}</b>
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
								to={"/project/task"}
								state={{
									task: task,
									role: role,
								}}
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
							<Button
								variant='outlined'
								color='warning'
								onClick={handleDelete}
							>
								Delete task
							</Button>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
};

export default TaskTableRow;
