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

const NotificationList = ({ open, anchorElement, handleClose, data, title, type }) => {
	const classes = notificationListStyles();
	return (
		<Menu id='simple-menu' anchorEl={anchorElement} keepMounted open={open} onClose={handleClose}>
			<Container>
				<Box component='div' whiteSpace='normal'>
					<Typography variant='subtitle1'>{title}</Typography>
					<Divider />
				</Box>
			</Container>
			{data
				? data.map((item, i) => {
						return (
							<MenuItem
								onClick={handleClose}
								key={i}
								style={{ backgroundColor: "transparent" }}
							>
								<Card className={classes.card} variant='outlined'>
									<CardContent>
										<Typography
											className={classes.title}
											color='textSecondary'
											gutterBottom
										>
											{item.project}
										</Typography>
										<Typography className={classes.pos} color='textSecondary'>
											{item.taskTitle}
										</Typography>

										{type === "comments" ? (
											<React.Fragment>
												<Box component='div' whiteSpace='normal'>
													<Typography variant='body2' component='p'>
														<b>{item.taggerName}</b> commented:
													</Typography>
												</Box>
												<Box component='div' whiteSpace='normal'>
													<Typography
														variant='body2'
														component='p'
														style={{
															// whiteSpace: "nowrap",
															overflow: "hidden",
															textOverflow: "ellipsis",
															display: "-webkit-box",
															WebkitLineClamp:
																"3" /* number of lines to show */,
															WebkitBoxOrient: "vertical",
														}}
													>
														{item.content}
													</Typography>
												</Box>
											</React.Fragment>
										) : null}
									</CardContent>
								</Card>
							</MenuItem>
						);
				  })
				: null}
		</Menu>
	);
};

export default NotificationList;
