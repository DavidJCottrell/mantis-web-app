import React from "react";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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
