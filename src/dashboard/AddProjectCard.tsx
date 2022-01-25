import React from "react";

// MUI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

// MUI Icons
import AddIcon from "@mui/icons-material/Add";

const AddProjectCard = ({ cardStyle, handleAddProjectOpen }) => {
	return (
		<Grid item xs={12} sm={6} md={4}>
			<Card style={cardStyle}>
				<Grid
					container
					direction='column'
					alignItems='center'
					justifyContent='center'
					style={cardStyle}
				>
					<Grid item>
						<Tooltip title='Add a project'>
							<IconButton
								color='inherit'
								onClick={handleAddProjectOpen}
								style={{ transform: "scale(2)" }}
							>
								<AddIcon />
							</IconButton>
						</Tooltip>
					</Grid>
				</Grid>
			</Card>
		</Grid>
	);
};

export default AddProjectCard;
