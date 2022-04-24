import React from "react";

import { useMutation, useQueryClient } from "react-query";

// Material-UI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import toast, { Toaster } from "react-hot-toast";

import * as invitationsApis from "../../apis/invitations";

const InviteUserDialog = ({ open, handleClose, projectId, title }) => {
	const queryClient = useQueryClient();

	const invitationMutation = useMutation(
		({ username, invitation }) => invitationsApis.addInvitation(username, invitation),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("fetchInvitationData");
			},
		}
	);

	const inviteUser = (e) => {
		e.preventDefault();

		const data = {
			inviter: {
				userId: localStorage.getItem("userId"),
				name: localStorage.getItem("fullName"),
			},
			project: {
				title: title,
				projectId: projectId,
			},
			role: document.getElementById("role-select").innerText,
		};

		invitationMutation.mutate({
			username: document.getElementById("username-field").value,
			invitation: data,
		});

		toast.success("Invited user!");
		handleClose();
	};

	return (
		<React.Fragment>
			<Toaster />
			<Dialog open={open} onClose={handleClose} fullWidth>
				<form onSubmit={inviteUser} autoComplete='off'>
					<DialogContent>
						{/* Add user field */}
						<Typography sx={{ mt: 1, mb: 1 }} variant='h6' component='div'>
							Invite a user
						</Typography>
						<TextField
							variant='outlined'
							margin='normal'
							label='Username'
							id='username-field'
							name='user'
							required
							autoComplete='off'
							color='secondary'
							fullWidth
						/>
						<Box sx={{ minWidth: 120 }}>
							<FormControl fullWidth>
								<InputLabel>Role</InputLabel>
								<Select id='role-select' required label='Role' defaultValue={""}>
									<MenuItem value={"Team Leader"}>Team Leader</MenuItem>
									<MenuItem value={"Developer"}>Developer</MenuItem>
									<MenuItem value={"Client"}>Client</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color='inherit'>
							Cancel
						</Button>
						<Button type='submit' color='inherit'>
							Invite
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</React.Fragment>
	);
};

export default InviteUserDialog;
