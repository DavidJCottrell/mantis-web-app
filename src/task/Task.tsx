import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

// Material-UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// Custom components
import Nav from "../nav/Nav";

const Task = () => {
	const location = useLocation();
	const { task, role } = (() => {
		try {
			return {
				task: location.state.task,
				role: location.state.role,
			};
		} catch (error) {
			window.location.replace("/");
		}
	})();

	return (
		<React.Fragment>
			<Nav showAddProject={false} />
			<Container>
				<Typography variant='h4'>
					{task.taskKey} - {task.title}
				</Typography>
				<br />
				<Link
					to={"/project"}
					state={{
						projectId: task,
						role: role,
					}}
					style={{
						textDecoration: "none",
					}}
				>
					Back to project
				</Link>
			</Container>
		</React.Fragment>
	);
};

export default Task;
