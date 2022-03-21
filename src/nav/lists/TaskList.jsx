import React from "react";
import { Link } from "react-router-dom";

// Material-UI
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

// Styles
import { notificationListStyles } from "../navStyles";

const TaskList = ({ open, anchorElement, handleClose, data, title }) => {
	const classes = notificationListStyles();

	return (
		<Menu anchorEl={anchorElement} open={open} onClose={handleClose} keepMounted>
			<Container>
				<Box component='div' whiteSpace='normal'>
					<Typography variant='subtitle1'>{title}</Typography>
					<Divider />
				</Box>
				{data.length > 0
					? data.map(({ task, parentProjectTitle, parentProjectId }, i) => {
							return (
								<MenuItem
									onClick={handleClose}
									key={i}
									style={{ backgroundColor: "transparent" }}
								>
									<Link
										to={"/project/task"}
										state={{
											task: task,
											projectId: parentProjectId,
										}}
										style={{
											textDecoration: "none",
										}}
									>
										<Card className={classes.card} variant='outlined'>
											<CardContent>
												<Typography
													className={classes.title}
													color='textSecondary'
													gutterBottom
												>
													{parentProjectTitle}
												</Typography>
												<Typography
													className={classes.pos}
													color='textSecondary'
												>
													{"Task: " + task.title}
												</Typography>
												<Typography
													className={classes.pos}
													color='textSecondary'
												>
													{"Status: " + String(task.status)}
												</Typography>
												<Typography
													className={classes.pos}
													color='textSecondary'
												>
													{"Due: " +
														(task.dateDue ? task.dateDue : "TBC")}
												</Typography>
											</CardContent>
										</Card>
									</Link>
								</MenuItem>
							);
					  })
					: null}
			</Container>
		</Menu>
	);
};

export default TaskList;
