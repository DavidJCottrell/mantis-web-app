import React, { StrictMode } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

// Material-UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

// Custom components
import Nav from "../nav/Nav";
import LifecycleBar from "./LifecycleBar";
import TaskInfoCard from "./TaskInfoCard";
import CommentsCard from "./CommentsCard";
import GitInfoCard from "./GitInfoCard";
import Subtasks from "./subtasks/Subtasks";

import * as projectApis from "../apis/project";

const Task = () => {
	const location = useLocation();
	const { task, projectId } = (() => {
		try {
			return {
				task: location.state.task,
				projectId: location.state.projectId,
			};
		} catch (error) {
			window.location.replace("/");
		}
	})();

	const roleQuery = useQuery("fetchProjectRole", () =>
		projectApis.getRole(projectId, localStorage.getItem("userId"))
	);

	const tasks = {
		toDo: [
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda laudantium incidunt eius ",
			"Task 2",
			"Task 3",
		],
		inProgress: ["Task 4", "Task 5", "Task 6"],
		complete: ["Task 7", "Task 8", "Task 9"],
	};

	return (
		<React.Fragment>
			{roleQuery.isSuccess ? (
				<React.Fragment>
					<Nav />
					<Container>
						<Typography variant='h4'>
							{task.taskKey} - {task.title}
						</Typography>
						<br />
						<Link
							to={"/project"}
							state={{
								projectId: projectId,
								role: roleQuery.data.role,
							}}
							style={{
								textDecoration: "none",
							}}
						>
							<Button variant='contained'>Back to project</Button>
						</Link>
						<br />
						<h2>Task Lifecycle</h2>
						<LifecycleBar status='In Development' />
						<br />
						<Grid container spacing={5}>
							{/* Git Log */}
							<Grid item xs={12} md={6}>
								<GitInfoCard />
							</Grid>

							{/* Task Information */}
							<Grid item xs={12} md={6}>
								<TaskInfoCard task={task} />
							</Grid>
						</Grid>

						<br />
						<h2>Subtasks</h2>

						<StrictMode>
							<Subtasks tasks={tasks} />
						</StrictMode>

						<br />

						<br />

						<Grid container>
							<Grid item xs={12}>
								<CommentsCard />
							</Grid>
						</Grid>
						<br />
						<br />
					</Container>
				</React.Fragment>
			) : null}
		</React.Fragment>
	);
};

export default Task;
