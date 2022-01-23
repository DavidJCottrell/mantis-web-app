import React from "react";

// Material-UI
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

// Styles
import { invitationListStyles } from "./navStyles";

const InvitationList = ({
	open,
	anchorElement,
	handleClose,
	invitationData,
}) => {
	const classes = invitationListStyles();

	const handleAcceptClick = (e) => {
		console.log("Accept");
		const projectId = e.target.dataset.pid;
		// handleClose();
	};
	const handleDeclineClick = (e) => {
		console.log("Decline");
		const projectId = e.target.dataset.pid;
		// handleClose();
	};

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
					<Typography variant='subtitle1'>
						Your Invitations
					</Typography>
					<Divider />
				</Box>
				{invitationData
					? invitationData.map((invitation, i) => {
							return (
								<MenuItem
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
												{invitation.title}
											</Typography>
											<Typography
												className={classes.title}
												color='textSecondary'
												gutterBottom
											>
												From: {invitation.from}
											</Typography>
											<Typography
												className={classes.title}
												color='textSecondary'
												gutterBottom
											>
												Role: {invitation.role}
											</Typography>
										</CardContent>
										<CardActions>
											<Button
												size='small'
												onClick={handleAcceptClick}
												data-pid={invitation.projectId}
											>
												Accept
											</Button>
											<Button
												size='small'
												color='warning'
												onClick={handleDeclineClick}
												data-pid={invitation.projectId}
											>
												Decline
											</Button>
										</CardActions>
									</Card>
								</MenuItem>
							);
					  })
					: null}
			</Container>
		</Menu>
	);
};

export default InvitationList;
