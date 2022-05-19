import React from "react";

import { useMutation, useQueryClient } from "react-query";

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
import { invitationListStyles } from "../navStyles";

import * as invitationsApis from "../../../apis/invitations";

const InvitationList = ({ open, anchorElement, handleClose, invitationData }) => {
	const classes = invitationListStyles();
	const queryClient = useQueryClient();

	const deleteInvitationMutation = useMutation(
		(invitationId) => invitationsApis.deleteInvitation(invitationId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("fetchUsersInvitations");
			},
		}
	);

	const acceptInvitationMutation = useMutation(
		(invitationId) => invitationsApis.acceptInvitation(invitationId),
		{
			onSuccess: (data) => {
				queryClient.setQueryData("getUserProjects", { projects: data.updatedProjects });
				queryClient.setQueryData("fetchUsersInvitations", {
					invitations: data.updatedInvitations,
				});
			},
		}
	);

	const handleAcceptClick = (e) => {
		const index = e.target.dataset.index;
		acceptInvitationMutation.mutate(invitationData[index]._id);
	};

	const handleDeclineClick = (e) => {
		const index = e.target.dataset.index;
		if (window.confirm("Are you sure you want to decline?"))
			deleteInvitationMutation.mutate(invitationData[index]._id);
	};

	return (
		<Menu anchorEl={anchorElement} open={open} onClose={handleClose} keepMounted>
			<Container>
				<Box component='div' whiteSpace='normal'>
					<Typography variant='subtitle1'>Your Invitations</Typography>
					<Divider />
				</Box>
				{invitationData?.map((invitation, i) => {
					return (
						<MenuItem key={i} style={{ backgroundColor: "transparent" }}>
							<Card className={classes.card} variant='outlined'>
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
										From: {invitation.inviter.name}
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
									<Button size='small' onClick={handleAcceptClick} data-index={i}>
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
				})}
			</Container>
		</Menu>
	);
};

export default InvitationList;
