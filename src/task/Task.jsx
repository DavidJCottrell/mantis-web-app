import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

// Material-UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

import { useMutation, useQueryClient } from "react-query";

// Custom components
import LifecycleBar from "./LifecycleBar";
import TaskInfoCard from "./TaskInfoCard";
import CommentsCard from "./CommentsCard";
import Subtasks from "./subtasks/Subtasks";

import Page from "../Page";

import * as projectApis from "../apis/project";
import * as taskApis from "../apis/task";

const Task = () => {
	const { taskId, projectId } = useParams();
	const queryClient = useQueryClient();
	const mobileViewSize = 760;

	const [isMobile, _setIsMobile] = useState(window.innerWidth <= mobileViewSize ? true : false);

	// (Event listener requires ref to set state)
	const isMobileRef = React.useRef(isMobile);
	const setIsMobile = (data) => {
		isMobileRef.current = data;
		_setIsMobile(data);
	};

	const { data: taskData } = useQuery("fetchTask", () => taskApis.getTask(projectId, taskId));

	const { data: roleData } = useQuery("fetchProjectRole", () =>
		projectApis.getRole(projectId, localStorage.getItem("userId"))
	);
	const updateStatusMutation = useMutation(
		({ projectId, taskId, status }) => taskApis.updateStatus(projectId, taskId, status),
		{
			onSuccess: (data) => {
				queryClient.setQueryData("fetchTask", data.data);
				if (data.data.task.status === "Resolved") {
					updateResolutionMutation.mutate({
						projectId: projectId,
						taskId: taskId,
						resolution: { resolution: "Resolved" },
					});
				} else {
					updateResolutionMutation.mutate({
						projectId: projectId,
						taskId: taskId,
						resolution: { resolution: "Un-Resolved" },
					});
				}
			},
		}
	);

	const updateResolutionMutation = useMutation(
		({ projectId, taskId, resolution }) =>
			taskApis.updateResolution(projectId, taskId, resolution),
		{
			onSuccess: (data) => {
				queryClient.setQueryData("fetchTask", data.data);
			},
		}
	);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= mobileViewSize) setIsMobile(true);
			else setIsMobile(false);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleStatusChange = (event) => {
		updateStatusMutation.mutate({
			projectId: projectId,
			taskId: taskId,
			status: { status: event.target.value },
		});
	};

	let currentUserIsAssigned;
	if (taskData) {
		for (const asignee of taskData.task.assignees) {
			if (localStorage.getItem("userId") === asignee.userId) currentUserIsAssigned = true;
			else currentUserIsAssigned = false;
		}
	}

	if (!taskData || !roleData) return <Page isLoading={true} />;

	return (
		<Page>
			<Container>
				<Typography variant='h4'>
					{taskData.task.taskKey} - {taskData.task.title}
				</Typography>
				<br />

				<Link to={`/project/${projectId}`} style={{ textDecoration: "none" }}>
					<Button variant='contained'>Back to project</Button>
				</Link>

				<br />
				<h2>Task Lifecycle</h2>
				<LifecycleBar status={taskData.task.status} isMobile={isMobile} />
				<br />

				{/* Lifecycle selector */}
				{currentUserIsAssigned ? (
					<FormControl style={{ minWidth: "200px" }}>
						<InputLabel>Status</InputLabel>
						<Select
							id='status-select'
							required
							label='Type'
							defaultValue={""}
							value={taskData.task.status}
							onChange={handleStatusChange}
						>
							<MenuItem value={"In Development"}>In Development</MenuItem>
							<MenuItem value={"Testing"}>Testing</MenuItem>
							<MenuItem value={"In Review"}>In Review</MenuItem>
							<MenuItem value={"Ready to Merge"}>Ready to Merge</MenuItem>
							<MenuItem value={"Resolved"}>Resolved</MenuItem>
						</Select>
					</FormControl>
				) : null}

				<br />
				<h2>Subtasks</h2>
				<Subtasks
					subtaskData={taskData.task.subtasks}
					projectId={projectId}
					taskId={taskData.task._id}
					currentUserIsAssigned={currentUserIsAssigned}
				/>

				<br />
				<br />
				<Grid container spacing={5}>
					{/* Task Information */}
					<Grid item xs={12} md={6}>
						<TaskInfoCard
							task={taskData.task}
							currentUserIsAssigned={currentUserIsAssigned}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CommentsCard
							comments={taskData.task.comments}
							projectId={projectId}
							taskId={taskData.task._id}
						/>
					</Grid>
				</Grid>
				<br />
				<br />
			</Container>
		</Page>
	);
};

export default Task;
