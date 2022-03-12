import React, { StrictMode, useEffect, useState } from "react";
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
	const mobileViewSize = 760;
	const location = useLocation();
	const [items, setItems] = useState(null);

	const [isMobile, _setIsMobile] = useState(window.innerWidth <= mobileViewSize ? true : false);
	const isMobileRef = React.useRef(isMobile);
	const setIsMobile = (data) => {
		isMobileRef.current = data;
		_setIsMobile(data);
	};

	const { task, projectId } = (() => {
		try {
			const { data, isSuccess } = useQuery(
				"fetchSubTasks",
				() => projectApis.getSubTasks(projectId, task._id),
				{
					onSuccess: (data) => setItems(data.subtasks),
				}
			);
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

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= mobileViewSize) setIsMobile(true);
			else setIsMobile(false);
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

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
						<LifecycleBar status='In Development' isMobile={isMobile} />

						<br />
						<h2>Subtasks</h2>

						{items ? (
							<StrictMode>
								<Subtasks
									subTasks={items}
									projectId={projectId}
									taskId={task._id}
								/>
							</StrictMode>
						) : null}

						<br />

						<br />

						<Grid container>
							<Grid item xs={12}>
								<CommentsCard />
							</Grid>
						</Grid>
						<br />
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
						<br />
					</Container>
				</React.Fragment>
			) : null}
		</React.Fragment>
	);
};

export default Task;
