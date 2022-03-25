import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useMutation } from "react-query";
import * as userApis from "../apis/user";
import auth from "../auth";

const SignUpDialog = ({ signUpOpen, handleSignUpClose, classes }) => {
	const signUpMutation = useMutation(userApis.signUp, {
		onSuccess: ({ data }) => auth.login(data), // Front-end login, store auth-token, and user details
		onError: (error) => toast.error(error.response.data),
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = document.getElementById("signUp-form");
		signUpMutation.mutate({
			password: form.password.value,
			vpassword: form.vpassword.value,
			email: form.email.value.toLowerCase(),
			firstName: form.fname.value,
			lastName: form.lname.value,
		});
	};

	return (
		<Dialog open={signUpOpen} onClose={handleSignUpClose} aria-labelledby='form-dialog-title'>
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
