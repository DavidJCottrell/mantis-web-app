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

const AddProjectDialog = ({ open, handleClose, handleAddProject }) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='form-dialog-title'
			fullWidth
		>
			<DialogTitle id='form-dialog-title'>Create project</DialogTitle>
			<form onSubmit={handleAddProject} autoComplete='off'>
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
