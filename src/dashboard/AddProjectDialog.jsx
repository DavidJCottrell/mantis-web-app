import React from "react";

// Material-UI
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import axios from "axios";

const AddProjectDialog = ({ open, handleClose }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		if (document.getElementsByName("title")[0] !== null) {
			const data = {
				title: document.getElementsByName("title")[0].value,
				users: [],
				tasks: [],
				githubURL: document.getElementsByName("githubURL")[0].value,
				description: document.getElementsByName("description")[0].value,
			};
			axios
				.post(process.env.REACT_APP_BASE_URL + "/project/add", data, {
					headers: {
						"auth-token": localStorage.getItem("auth-token"),
					},
				})
				// Project created successfully
				.then((res) => {
					handleClose();
					window.location.reload();
				})
				// If failed
				.catch((e) => {
					console.log("Error creating project: ", e);
				});
		}
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='form-dialog-title'
			fullWidth
		>
			<DialogTitle id='form-dialog-title'>Create project</DialogTitle>
			<form onSubmit={handleSubmit} autoComplete='off'>
				<DialogContent>
					<Typography variant='subtitle1'>Project details</Typography>
					<Divider />

					{/* Project title field */}
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						label='Title'
						name='title'
						autoComplete='off'
						color='secondary'
					/>
					{/* Description field */}
					<TextField
						variant='outlined'
						margin='normal'
						fullWidth
						label='Description'
						name='description'
						autoComplete='off'
						color='secondary'
					/>
					{/* Project github url field */}
					<TextField
						variant='outlined'
						margin='normal'
						fullWidth
						label='GitHub repository URL'
						name='githubURL'
						autoComplete='off'
						color='secondary'
					/>
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
	);
};

export default AddProjectDialog;
