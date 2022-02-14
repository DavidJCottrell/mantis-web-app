import React, { useState } from "react";

// MUI
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const PreconditionInput = () => {
	const [preconditions, setPreconditions] = useState(1);
	return (
		<React.Fragment>
			{[...Array(preconditions)].map((e, i) => (
				<TextField
					key={i}
					id='outlined-basic'
					label='precondition'
					variant='outlined'
					name='Preconditions'
				/>
			))}

			<IconButton
				aria-label='add'
				onClick={() => {
					setPreconditions(preconditions + 1);
				}}
			>
				<AddIcon />
			</IconButton>
			<IconButton
				aria-label='add'
				onClick={() => {
					if (preconditions > 1) setPreconditions(preconditions - 1);
				}}
			>
				<RemoveIcon />
			</IconButton>
		</React.Fragment>
	);
};

export default PreconditionInput;
