import React, { useState } from "react";

// MUI
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const PreconditionInput = ({ preconditions }) => {
	const [systemPreconditions, setSystemPreconditions] = useState(
		preconditions ? preconditions.length : 1
	);
	return (
		<React.Fragment>
			{[...Array(systemPreconditions)].map((e, i) => (
				<TextField
					key={i}
					id='outlined-basic'
					label='precondition'
					variant='outlined'
					name='Preconditions'
					defaultValue={preconditions ? preconditions[i] : ""}
				/>
			))}

			<IconButton
				aria-label='add'
				onClick={() => {
					setSystemPreconditions(systemPreconditions + 1);
				}}
			>
				<AddIcon />
			</IconButton>
			<IconButton
				aria-label='add'
				onClick={() => {
					if (systemPreconditions > 1)
						setSystemPreconditions(systemPreconditions - 1);
				}}
			>
				<RemoveIcon />
			</IconButton>
		</React.Fragment>
	);
};

export default PreconditionInput;
