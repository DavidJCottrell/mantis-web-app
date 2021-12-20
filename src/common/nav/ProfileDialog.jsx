import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
					<li>Name: {localStorage.getItem("user-name")}</li>
					<li>Username: {localStorage.getItem("user-username")}</li>
					<li>Email: {localStorage.getItem("user-email")}</li>
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
