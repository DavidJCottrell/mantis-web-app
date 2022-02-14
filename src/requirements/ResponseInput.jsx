import React, { useState } from "react";

// MUI
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ResponseInput = () => {
	const [systemResponses, setSystemResponses] = useState(1);
	return (
		<React.Fragment>
			{[...Array(systemResponses)].map((e, i) => (
				<TextField
					key={i}
					id='outlined-basic'
					label='system response'
					variant='outlined'
					name='System Responses'
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
