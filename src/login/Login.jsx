import React, { useState } from "react";
import { useMutation } from "react-query";

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
import logo from "./mantis.jpg";
import auth from "../auth";
import * as usersApis from "../apis/users";

import toast, { Toaster } from "react-hot-toast";

const Login = () => {
	const classes = loginStyles();

	const loginMutation = useMutation(usersApis.login, {
		onSuccess: ({ data }) => auth.login(data),
		onError: (error) => toast.error(error.response.data),
	});

	const [signUpOpen, setSignUpOpen] = useState(false);
	const handleSignUpOpen = () => setSignUpOpen(true);
	const handleSignUpClose = () => setSignUpOpen(false);

	return (
		<React.Fragment>
			<Toaster />
			<Grid container component='main' className={classes.root}>
				<CssBaseline />
				<Grid item xs={false} md={7}>
					<Hidden only={["xs", "sm"]}>
						<div className={classes.center}>
							<div>
								<Avatar src={logo} sx={{ width: 200, height: 200 }} />
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
								fullWidth
								variant='contained'
								color='secondary'
								className={classes.submit}
								onClick={() => {
									const form = document.getElementById("login-form");
									loginMutation.mutate({
										email: form.email.value,
										password: form.password.value,
									});
								}}
							>
								Sign In
							</Button>
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
			/>
		</React.Fragment>
	);
};

export default Login;
