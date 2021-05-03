import React from "react";

// Material-UI
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";

const AddUserField = () => {
	return (
		<React.Fragment>
			<Typography variant='subtitle1'>Add a member</Typography>
			<Divider />
			<TextField
				variant='outlined'
				margin='normal'
				label='Username'
				name='user'
				autoComplete='off'
				color='secondary'
				fullWidth
			/>
		</React.Fragment>
	);
};

export default AddUserField;
