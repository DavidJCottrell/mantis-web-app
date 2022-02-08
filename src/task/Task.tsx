import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

// Material-UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// Custom components
import Nav from "../nav/Nav";
import LifecycleBar from "./LifecycleBar";

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
						<LifecycleBar />
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
							Back to project
						</Link>
					</Container>{" "}
				</React.Fragment>
			) : null}
		</React.Fragment>
	);
};

export default Task;
