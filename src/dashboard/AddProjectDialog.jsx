import React from "react";

// Material-UI
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";

// Custom components
import AddUserField from "../common/AddUserField";

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
				.post("http://localhost:9000/project/add", data, {
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
					{/* Add user field */}
					<AddUserField />
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
