import React from "react";
import { useLocation } from "react-router-dom";

// Material-UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Custom components
import Nav from "../common/nav/Nav";

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
				<Button
					variant='contained'
					color='secondary'
					onClick={() => {
						history.back();
					}}
				>
					Back to project
				</Button>
			</Container>
		</React.Fragment>
	);
};

export default Task;
