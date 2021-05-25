import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

// Test

// Material-UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Snackbar

// Styles
import { loginStyles } from "./loginStyles";

const Login = (props) => {
	const classes = loginStyles();

	const login = () => {
		props.auth.login(() => {});
	};

	const [signUpOpen, setSignUpOpen] = useState(false);

	const handleSignUpOpen = () => setSignUpOpen(true);

	const handleSignUpClose = () => setSignUpOpen(false);

	return (
		<React.Fragment>
			<Grid container component='main' className={classes.root}>
				<CssBaseline />
				{/* component={Paper} */}
				<Grid item xs={false} md={7}>
					<Hidden only={["xs", "sm"]}>
						<div className={classes.center}>
							<div>
								{/* <Typography component='h1' variant='h2'>
									Mantis
								</Typography> */}
								<Avatar
									alt='Logo'
									src={require("../images/mantis.jpg")}
									className={classes.logo}
								/>
							</div>
						</div>
					</Hidden>
				</Grid>
				<Grid
					item
					xs={12}
					md={5}
					elevation={6}
					component={Paper}
					square
				>
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Sign in
						</Typography>
						<form className={classes.form} noValidate>
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

							<RouterLink
								to='/'
								style={{ textDecoration: "none" }}
								onClick={login}
							>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									color='secondary'
									className={classes.submit}
								>
									Sign In
								</Button>
							</RouterLink>
							<Grid container>
								<Grid item xs>
									<Link
										href='#'
										variant='body2'
										color='inherit'
									>
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
			<Dialog
				open={signUpOpen}
				onClose={handleSignUpClose}
				aria-labelledby='form-dialog-title'
			>
				<DialogTitle id='form-dialog-title'>Sign Up</DialogTitle>
				<DialogContent>
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
				</DialogContent>
				<DialogActions>
					<Button onClick={handleSignUpClose} color='inherit'>
						Cancel
					</Button>
					<Button onClick={handleSignUpClose} color='inherit'>
						Sign up
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default Login;
