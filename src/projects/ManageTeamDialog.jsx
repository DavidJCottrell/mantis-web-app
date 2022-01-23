import React from "react";
import axios from "axios";

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

import toast, { Toaster } from "react-hot-toast";

const ManageTeamDialog = ({
	open,
	handleClose,
	projectId,
	users,
	invitations,
}) => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleRemoveUser = (index) => {
		if (window.confirm("Are you sure you want to remove this user?")) {
			const config = {
				method: "patch",
				url:
					process.env.REACT_APP_BASE_URL +
					"/project/removeuser/" +
					String(users[index].userId) +
					"/" +
					String(projectId),
				headers: { "auth-token": localStorage.getItem("auth-token") },
			};
			axios(config)
				.then((res) => {
					console.log("Success");
					// window.location.reload();
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const handleEditRole = (e) => {
		console.log("Edit Role");
	};

	const handleRemoveInvitation = (index) => {
		if (
			window.confirm("Are you sure you want to remove this invitation?")
		) {
			const config = {
				method: "delete",
				url:
					process.env.REACT_APP_BASE_URL +
					"/invitation/delete/" +
					String(invitations[index]._id),
				headers: { "auth-token": localStorage.getItem("auth-token") },
			};
			axios(config)
				.then((res) => {
					toast.success("Removed invitation");
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<React.Fragment>
			<Toaster />
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
				fullWidth
			>
				<form onSubmit={handleSubmit} autoComplete='off'>
					<DialogContent>
						{/* Add user field */}
						<Typography
							sx={{ mt: 4, mb: 2 }}
							variant='h6'
							component='div'
						>
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
																	marginRight:
																		"1px",
																}}
																onClick={() => {
																	handleRemoveUser(
																		i
																	);
																}}
															>
																<RemoveCircleIcon />
															</IconButton>
														</Tooltip>
														<Tooltip title='Edit role'>
															<IconButton
																edge='end'
																aria-label='delete'
																onClick={
																	handleEditRole
																}
															>
																<EditIcon />
															</IconButton>
														</Tooltip>
													</React.Fragment>
												}
											>
												<ListItemText
													primary={
														user.name +
														" (" +
														user.role +
														")"
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
																marginRight:
																	"1px",
															}}
															onClick={() => {
																handleRemoveInvitation(
																	i
																);
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
				</form>
			</Dialog>
		</React.Fragment>
	);
};

export default ManageTeamDialog;
