import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import TaskTableRow from "./TaskTableRow";
import toast, { Toaster } from "react-hot-toast";

const TaskTable = ({ isMobile, role, projectId, title, tasks }) => {
	const toastTaskAdded = () => toast.success("Task removed successfully");

	return (
		<React.Fragment>
			<Toaster />
			<br />
			<Typography variant='h5'>{title}</Typography>
			<br />
			{tasks.length > 0 ? (
				<TableContainer component={Paper}>
					<Table aria-label='collapsible table'>
						<TableHead>
							<TableRow>
								<TableCell>Key</TableCell>
								<TableCell align='left'>Title</TableCell>
								{isMobile ? (
									<React.Fragment>
										<TableCell align='left'>Status</TableCell>
										<TableCell align='left'>Resolution</TableCell>
									</React.Fragment>
								) : null}
								<TableCell />
							</TableRow>
						</TableHead>
						<TableBody>
							{tasks.map((task) => (
								<TaskTableRow
									key={task.taskKey}
									task={task}
									role={role}
									isMobile={isMobile}
									projectId={projectId}
									toastTaskAdded={toastTaskAdded}
								/>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			) : (
				<Typography variant='h6'>No Tasks</Typography>
			)}
		</React.Fragment>
	);
};

export default TaskTable;
