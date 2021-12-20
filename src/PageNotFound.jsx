import React from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const PageNotFound = () => {
	let path = window.location.pathname;
	let page = path.split("/").pop();

	return (
		<Grid
			container
			spacing={0}
			direction='column'
			alignItems='center'
			justify='center'
			style={{ minHeight: "70vh", textAlign: "center" }}
		>
			<Grid item xs={10}>
				<Typography variant='h2'>404</Typography>
				<Typography variant='h5'>
					The page "{page}" could not be found
				</Typography>
				<br />
				<Link style={{ textDecoration: "none" }} to='/'>
					<Button variant='contained'>Return home</Button>
				</Link>
			</Grid>
		</Grid>
	);
};

export default PageNotFound;
