import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import TaskTableRow from "./TaskTableRow";

const TaskTable = ({
	projectData,
	isMobile,
	role,
	projectId,
	removeTaskComplete,
}) => {
	return (
		<Grid item xs={12} md={8}>
			<Typography variant='h4'>{projectData.title}</Typography>
			<br />
			<TableContainer component={Paper}>
				<Table aria-label='collapsible table'>
					<TableHead>
						<TableRow>
							<TableCell>Key</TableCell>
							<TableCell align='left'>Title</TableCell>
							{isMobile ? (
								<React.Fragment>
									<TableCell align='left'>Status</TableCell>
									<TableCell align='left'>
										Resolution
									</TableCell>
								</React.Fragment>
							) : null}
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{projectData.tasks.map((task) => (
							<TaskTableRow
								key={task.taskKey}
								task={task}
								role={role}
								isMobile={isMobile}
								projectId={projectId}
								removeTaskComplete={removeTaskComplete}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	);
};

export default TaskTable;