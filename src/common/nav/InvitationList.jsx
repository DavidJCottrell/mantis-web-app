import React from "react";
import axios from "axios";

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

import toast, { Toaster } from "react-hot-toast";

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
		const index = e.target.dataset.index;

		let config = {
			method: "post",
			url: process.env.REACT_APP_BASE_URL + "/invitation/accept",
			headers: { "auth-token": localStorage.getItem("auth-token") },
			data: {
				projectId: String(invitationData[index].project.projectId),
				userId: String(invitationData[index].invitee.userId),
				role: String(invitationData[index].role),
			},
		};

		axios(config)
			.then((res) => {
				toast.success(res.data.message);
			})
			.catch((e) => {
				toast.error(e.response.data);
			});

		config = {
			method: "delete",
			url:
				process.env.REACT_APP_BASE_URL +
				"/invitation/delete/" +
				String(invitationData[index]._id),
			headers: { "auth-token": localStorage.getItem("auth-token") },
		};

		axios(config)
			.then((res) => {
				console.log(res.data.message);
			})
			.catch((e) => {
				toast.error(e.response.data);
			});

		handleClose();
		window.location.reload();
	};
	const handleDeclineClick = (e) => {
		console.log("Decline");
		const projectId = e.target.dataset.pid;
		// invitation/delete
		// ...
		// handleClose();
	};

	return (
		<React.Fragment>
			<Toaster />
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
										style={{
											backgroundColor: "transparent",
										}}
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
													{invitation.project.title}
												</Typography>
												<Typography
													className={classes.title}
													color='textSecondary'
													gutterBottom
												>
													From:{" "}
													{invitation.inviter.name}
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
													data-index={i}
												>
													Accept
												</Button>
												<Button
													size='small'
													color='warning'
													onClick={handleDeclineClick}
													data-index={i}
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
		</React.Fragment>
	);
};

export default InvitationList;
