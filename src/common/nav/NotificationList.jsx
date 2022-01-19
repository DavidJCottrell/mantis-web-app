import React from "react";

// Material-UI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

// Styles
import { notificationListStyles } from "./navStyles";

const NotificationList = ({
	open,
	anchorElement,
	handleClose,
	data,
	title,
	type,
}) => {
	const classes = notificationListStyles();
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

export default NotificationList;
