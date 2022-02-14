import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

// Material-UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

const GitInfoCard = () => {
	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography variant='h5' component='div'>
					Git Info
				</Typography>
			</CardContent>
			<CardActions>
				<Button size='small'>Button</Button>
			</CardActions>
		</Card>
	);
};

export default GitInfoCard;
