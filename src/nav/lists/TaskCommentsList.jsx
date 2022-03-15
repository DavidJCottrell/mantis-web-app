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

const TaskCommentsList = ({ open, anchorElement, handleClose, data, title }) => {
	const classes = notificationListStyles();
	let comments = [];
	for (const task of data) {
		for (const comment of task.task.comments) {
			comments.push({
				parentTask: task.task,
				parentProject: {
					title: task.parentProjectTitle,
					id: task.parentProjectId,
				},
				content: comment.content,
				author: comment.authorName,
			});
		}
	}

	return (
		<Menu
			id='simple-menu'
			anchorEl={anchorElement}
			keepMounted
			open={open}
			onClose={handleClose}
		>
			<Container>
				<Box component='div' whiteSpace='normal'>
					<Typography variant='subtitle1'>{title}</Typography>
					<Divider />
				</Box>
				{comments
					? comments.map(({ parentTask, content, parentProject, author }, i) => {
							return (
								<MenuItem
									onClick={handleClose}
									key={i}
									style={{ backgroundColor: "transparent" }}
								>
									<Link
										to={{
											pathname: "/project/task",
										}}
										state={{
											task: parentTask,
											projectId: parentProject.id,
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
													variant='body2'
													gutterBottom
												>
													{parentProject.title +
														": " +
														parentTask.taskKey +
														" - " +
														parentTask.title}
												</Typography>
												<Typography
													className={classes.pos}
													color='textSecondary'
													variant='body2'
													gutterBottom
												>
													{"- " + author}
												</Typography>

												<Typography
													className={classes.pos}
													color='textSecondary'
													variant='body2'
												>
													{content}
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

export default TaskCommentsList;
