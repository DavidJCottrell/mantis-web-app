import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

// Material-UI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Hidden from "@mui/material/Hidden";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

// Styles
import { loginStyles } from "./loginStyles";

import SignUpDialog from "./SignUpDialog";
import logo from "../images/mantis.jpg";
import auth from "../utils/auth";
import * as userApis from "../apis/user";

const Login = () => {
	const classes = loginStyles();

	const login = (email: String, password: String) => {
		userApis.login({ email: email, password: password }).then((userData) => {
			auth.login(userData); // Front-end login, store auth-token, and user details
			window.location.href = "/";
		});
	};

	const signUp = (signUpData) => {
		console.log(signUpData);
		if (signUpData.password === signUpData.vpassword) {
			const data = {
				firstName: signUpData.firstName,
				lastName: signUpData.lastName,
				email: signUpData.email,
				password: signUpData.password,
			};
			userApis
				.signUp(data)
				.then(() => login(signUpData.email, signUpData.password));
		} else {
			toast.error("Passwords do not match, please try again.");
		}
	};

	const [signUpOpen, setSignUpOpen] = useState(false);
	const handleSignUpOpen = () => setSignUpOpen(true);
	const handleSignUpClose = () => setSignUpOpen(false);

	return (
		<React.Fragment>
			<Toaster />
			<Grid container component='main' className={classes.root}>
				<CssBaseline />
				{/* component={Paper} */}
				<Grid item xs={false} md={7}>
					<Hidden only={["xs", "sm"]}>
						<div className={classes.center}>
							<div>
								<Avatar
									alt='Logo'
									src={logo}
									sx={{ width: 200, height: 200 }}
								/>
							</div>
						</div>
					</Hidden>
				</Grid>
				<Grid item xs={12} md={5} elevation={6} component={Paper} square>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<form className={classes.form} id='login-form' noValidate>
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
								name='password'
								label='Password'
								type='password'
								autoComplete='current-password'
								color='secondary'
							/>
							<Button
								// type='submit'
								fullWidth
								variant='contained'
								color='secondary'
								className={classes.submit}
								onClick={() => {
									const form: HTMLFormElement = document.getElementById(
										"login-form"
									) as HTMLFormElement;
									const email: String = form.email.value;
									const password: String = form.password.value;
									login(email, password);
								}}
							>
								Sign In
							</Button>
							{/* </RouterLink> */}
							<Grid container>
								<Grid item xs>
									<Link href='#' variant='body2' color='inherit'>
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link
										href='#'
										variant='body2'
										color='inherit'
										onClick={handleSignUpOpen}
									>
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</Grid>
			</Grid>
			<SignUpDialog
				signUpOpen={signUpOpen}
				handleSignUpClose={handleSignUpClose}
				classes={classes}
				signUp={signUp}
			/>
		</React.Fragment>
	);
};

export default Login;
