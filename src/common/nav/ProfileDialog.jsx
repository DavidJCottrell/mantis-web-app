import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const AccountMenu = (props) => {
	return (
		<Dialog
			open={props.open}
			onClose={props.handleClose}
			aria-labelledby='form-dialog-title'
			fullWidth
		>
			<DialogTitle id='form-dialog-title'>Your profile</DialogTitle>
			<DialogContent>
				<Typography variant='subtitle1'>Profile details</Typography>
				<ul>
					<li>Name: {localStorage.getItem("fullname")}</li>
					<li>Username: {localStorage.getItem("username")}</li>
					<li>Email: {localStorage.getItem("email")}</li>
				</ul>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color='inherit'>
					Cancel
				</Button>
				<Button onClick={props.handleClose} color='inherit' disabled>
					Update
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default AccountMenu;
