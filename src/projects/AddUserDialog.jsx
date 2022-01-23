import React from "react";
import axios from "axios";

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
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";

import toast, { Toaster } from "react-hot-toast";

const AddUserDialog = ({ open, handleClose, projectId, title }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		const role = document.getElementById("role-select").innerText;
		const username = document.getElementById("username-field").value;

		var config = {
			method: "post",
			url:
				process.env.REACT_APP_BASE_URL +
				"/invitation/sendinvite/" +
				String(username),
			headers: { "auth-token": localStorage.getItem("auth-token") },
			data: {
				inviter: {
					userId: localStorage.getItem("userId"),
					name: localStorage.getItem("fullName"),
				},
				project: {
					title: title,
					projectId: projectId,
				},
				role: role,
			},
		};

		axios(config)
			.then((res) => {
				toast.success(res.data.message);
				handleClose();
			})
			.catch((e) => {
				toast.error(e.response.data);
			});
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
						<Typography variant='subtitle1'>
							Invite a user
						</Typography>
						<Divider />
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
								<Select
									id='role-select'
									required
									label='Role'
									defaultValue={""}
								>
									<MenuItem value={"Team Leader"}>
										Team Leader
									</MenuItem>
									<MenuItem value={"Developer"}>
										Developer
									</MenuItem>
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
							Create
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</React.Fragment>
	);
};

export default AddUserDialog;
