import React from "react";

// MUI
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";

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
