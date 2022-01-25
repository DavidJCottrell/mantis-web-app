import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const SignUpDialog = ({ signUpOpen, handleSignUpClose, classes, signUp }) => {
	return (
		<Dialog
			open={signUpOpen}
			onClose={handleSignUpClose}
			aria-labelledby='form-dialog-title'
		>
			<DialogTitle id='form-dialog-title'>Sign Up</DialogTitle>
			<DialogContent>
				<form className={classes.form} id='signUp-form'>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						label='Email Address'
						name='email'
						autoComplete='email'
						color='secondary'
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						label='First Name'
						name='fname'
						autoComplete='given-name'
						color='secondary'
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						label='Last Name'
						name='lname'
						autoComplete='family-name'
						color='secondary'
					/>

					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						label='Password'
						name='password'
						type='password'
						color='secondary'
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						label='Verify Password'
						name='vpassword'
						type='password'
						color='secondary'
					/>
				</form>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleSignUpClose} color='inherit'>
					Cancel
				</Button>
				<Button onClick={(handleSignUpClose, signUp)} color='inherit'>
					Sign up
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SignUpDialog;
