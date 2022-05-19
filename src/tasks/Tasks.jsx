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

import Page from "../global-components/Page";

import * as projectsApis from "../apis/projects";
import * as tasksApis from "../apis/tasks";

const Tasks = () => {
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

	const { data: taskData } = useQuery("fetchTask", () => tasksApis.getTask(projectId, taskId));

	const { data: roleData } = useQuery("fetchProjectRole", () =>
		projectsApis.getRole(projectId, localStorage.getItem("userId"))
	);

	const updateStatusMutation = useMutation(
		({ projectId, taskId, status }) => tasksApis.updateStatus(projectId, taskId, status),
		{
			onSuccess: (data) => {
				queryClient.setQueryData("fetchTask", data);
			},
		}
	);

	useEffect(() => {
		const reloadCount = sessionStorage.getItem("reloadCount");
		if (reloadCount < 1) {
			sessionStorage.setItem("reloadCount", String(reloadCount + 1));
			window.location.reload();
		} else {
			sessionStorage.removeItem("reloadCount");
		}
		// Lifecycle bar should change when on mobile
		const handleResize = () => {
			if (window.innerWidth <= mobileViewSize) setIsMobile(true);
			else setIsMobile(false);
		};
		window.addEventListener("resize", handleResize);
		// Remove event listener when component is destroyed
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
		for (const assignee of taskData.assignees)
			if (localStorage.getItem("userId") === assignee.userId) currentUserIsAssigned = true;
	}

	if (!taskData || !roleData) return <Page isLoading={true} />;

	return (
		<Page>
			<Container>
				<Typography variant='h4'>
					{taskData.taskKey} - {taskData.title}
				</Typography>
				<br />

				<Link to={`/projects/${projectId}`} style={{ textDecoration: "none" }}>
					<Button variant='contained'>Back to project</Button>
				</Link>

				<br />
				<h2>Task Lifecycle</h2>
				<LifecycleBar status={taskData.status} isMobile={isMobile} />
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
							value={taskData.status}
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
					subtaskData={taskData.subtasks}
					projectId={projectId}
					taskId={taskData._id}
					currentUserIsAssigned={currentUserIsAssigned}
				/>

				<br />
				<br />
				<Grid container spacing={5}>
					{/* Task Information */}
					<Grid item xs={12} md={6}>
						<TaskInfoCard
							task={taskData}
							currentUserIsAssigned={currentUserIsAssigned}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<CommentsCard
							comments={taskData.comments}
							projectId={projectId}
							taskId={taskData._id}
						/>
					</Grid>
				</Grid>
				<br />
				<br />
			</Container>
		</Page>
	);
};

export default Tasks;
