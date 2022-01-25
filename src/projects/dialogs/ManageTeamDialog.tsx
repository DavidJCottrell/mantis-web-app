import React from "react";

import { useMutation, useQueryClient } from "react-query";

// Material-UI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

import * as invitationApis from "../../apis/invitation";
import * as projectApis from "../../apis/project";

const ManageTeamDialog = ({
	open,
	handleClose,
	projectId,
	users,
	invitations,
	removeUserComplete,
	removeInvitationComplete,
}) => {
	const queryClient = useQueryClient();

	const userMutation = useMutation(
		({ projectId, userId }) => projectApis.removeUser(projectId, userId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("fetchProjectData");
			},
		}
	);

	const invitationMutation = useMutation(
		(invitationId) => invitationApis.deleteInvitation(invitationId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("fetchInvitationData");
			},
		}
	);

	const removeUser = (index) => {
		if (window.confirm("Are you sure you want to remove this user?")) {
			userMutation.mutate({
				projectId: projectId,
				userId: users[index].userId,
			});
			removeUserComplete();
		}
	};

	const handleEditRole = (e) => {
		console.log("Edit Role");
	};

	const removeInvitation = (index) => {
		if (window.confirm("Are you sure you want to remove this invitation?")) {
			invitationMutation.mutate(invitations[index]._id);
			removeInvitationComplete();
		}
	};

	return (
		<React.Fragment>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
				fullWidth
			>
				<DialogContent>
					{/* Add user field */}
					<Typography sx={{ mt: 1, mb: 1 }} variant='h6' component='div'>
						Team Members
					</Typography>

					<Box sx={{ flexGrow: 1, maxWidth: 800 }}>
						<Grid container>
							<Grid
								item
								xs={12}
								md={12}
								// style={{ backgroundColor: "green" }}
							>
								<List>
									{users.map((user, i) => (
										<ListItem
											key={i}
											secondaryAction={
												<React.Fragment>
													<Tooltip title='Remove user'>
														<IconButton
															edge='end'
															aria-label='delete'
															style={{
																marginRight: "1px",
															}}
															onClick={() => {
																removeUser(i);
															}}
														>
															<RemoveCircleIcon />
														</IconButton>
													</Tooltip>
													<Tooltip title='Edit role'>
														<IconButton
															edge='end'
															aria-label='delete'
															onClick={handleEditRole}
														>
															<EditIcon />
														</IconButton>
													</Tooltip>
												</React.Fragment>
											}
										>
											<ListItemText
												primary={
													user.name + " (" + user.role + ")"
												}
											/>
										</ListItem>
									))}
								</List>
								<Divider />
								<Typography
									sx={{ mt: 4, mb: 2 }}
									variant='h6'
									component='div'
								>
									Invited Users
								</Typography>
								{invitations.map((invitation, i) => (
									<ListItem
										key={i}
										secondaryAction={
											<React.Fragment>
												<Tooltip title='Remove user'>
													<IconButton
														edge='end'
														aria-label='delete'
														style={{
															marginRight: "1px",
														}}
														onClick={() => {
															removeInvitation(i);
														}}
													>
														<RemoveCircleIcon />
													</IconButton>
												</Tooltip>
											</React.Fragment>
										}
									>
										<ListItemText
											primary={
												invitation.invitee.name +
												" (" +
												invitation.role +
												")"
											}
										/>
									</ListItem>
								))}
							</Grid>
						</Grid>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='inherit'>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default ManageTeamDialog;
