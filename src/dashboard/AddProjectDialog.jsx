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

// Custom components
import AddUserField from "../common/AddUserField";

const AddProjectDialog = ({ open, handleClose }) => {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='form-dialog-title'
			fullWidth
		>
			<DialogTitle id='form-dialog-title'>Create project</DialogTitle>
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
				{/* Project github url field */}
				<TextField
					variant='outlined'
					margin='normal'
					fullWidth
					label='GitHub repository URL'
					name='github'
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
				<Button onClick={handleClose} color='inherit' disabled>
					Create
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AddProjectDialog;
