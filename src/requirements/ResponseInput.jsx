import React, { useState } from "react";

// MUI
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ResponseInput = ({ responses }) => {
	const [systemResponses, setSystemResponses] = useState(
		responses ? responses.length : 1
	);
	return (
		<React.Fragment>
			{[...Array(systemResponses)].map((e, i) => (
				<TextField
					key={i}
					id='outlined-basic'
					label='System Response'
					variant='outlined'
					name='System Responses'
					defaultValue={responses ? responses[i] : ""}
					sx={{ marginTop: "10px" }}
				/>
			))}

			<IconButton
				aria-label='add'
				onClick={() => {
					setSystemResponses(systemResponses + 1);
				}}
			>
				<AddIcon />
			</IconButton>
			<IconButton
				aria-label='add'
				onClick={() => {
					if (systemResponses > 1) setSystemResponses(systemResponses - 1);
				}}
			>
				<RemoveIcon />
			</IconButton>
		</React.Fragment>
	);
};

export default ResponseInput;
