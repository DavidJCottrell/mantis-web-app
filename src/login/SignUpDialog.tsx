import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const SignUpDialog = ({ signUpOpen, handleSignUpClose, classes, signUp }) => {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const form = document.getElementById("signUp-form") as HTMLFormElement;
		handleSignUpClose();
		signUp({
			password: form.password.value as String,
			vpassword: form.vpassword.value as String,
			email: form.email.value.toLowerCase() as String,
			firstName: form.fname.value as String,
			lastName: form.lname.value as String,
		});
	};

	return (
		<Dialog
			open={signUpOpen}
			onClose={handleSignUpClose}
			aria-labelledby='form-dialog-title'
		>
			<DialogTitle id='form-dialog-title'>Sign Up</DialogTitle>
			<form
				className={classes.form}
				onSubmit={handleSubmit}
				id='signUp-form'
				autoComplete='off'
			>
				<DialogContent>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						label='Email Address'
						name='email'
						color='secondary'
						autoComplete='off'
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
						autoComplete='off'
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
				</DialogContent>
				<DialogActions>
					<Button onClick={handleSignUpClose} color='inherit'>
						Cancel
					</Button>
					<Button type='submit' color='inherit'>
						Sign up
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default SignUpDialog;
