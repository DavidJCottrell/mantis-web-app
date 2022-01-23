import React from "react";

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
import { notificationListStyles } from "./navStyles";

const TaskList = ({ open, anchorElement, handleClose, data, title, type }) => {
	const classes = notificationListStyles();
	// console.log(data)
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
				{data
					? data.map(({ task, comment, parentProjectTitle }, i) => {
							// console.log(task);
							return (
								<MenuItem
									onClick={handleClose}
									key={i}
									style={{ backgroundColor: "transparent" }}
								>
									<Card
										className={classes.card}
										variant='outlined'
									>
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
												{"Status: " +
													String(task.status)}
											</Typography>
											<Typography
												className={classes.pos}
												color='textSecondary'
											>
												{"Due: " +
													(task.dateDue
														? task.dateDue
														: "TBC")}
											</Typography>
										</CardContent>
									</Card>
								</MenuItem>
							);
					  })
					: null}
			</Container>
		</Menu>
	);
};

export default TaskList;
