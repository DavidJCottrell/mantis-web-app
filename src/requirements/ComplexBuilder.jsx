import React, { useState } from "react";

// MUI
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import ResponseInput from "./ResponseInput";
import PreconditionInput from "./PreconditionInput";

const ComplexBuilder = ({ setComponents, components }) => {
	const [complexKeywords, setComplexKeywords] = useState(1);

	return (
		<React.Fragment>
			{[...Array(complexKeywords)].map((e, i) => (
				<FormControl
					sx={{ minWidth: "150px", marginRight: "10px" }}
					variant='standard'
					key={i}
				>
					<InputLabel>Keyword {i + 1}</InputLabel>
					<Select id='keyword-select' label='Type' defaultValue={""}>
						<MenuItem
							value={"State Driven"}
							onClick={() => {
								let newComponents = [...components];
								newComponents[i] = (
									<React.Fragment>
										<p>While the</p>
										<PreconditionInput />
									</React.Fragment>
								);
								setComponents(newComponents);
							}}
						>
							State ("While")
						</MenuItem>
						<MenuItem
							value={"Event Driven"}
							onClick={() => {
								let newComponents = [...components];
								newComponents[i] = (
									<React.Fragment>
										<p>When</p>
										<TextField
											id='outlined-basic'
											label='Trigger'
											variant='outlined'
											name='Trigger'
										/>
									</React.Fragment>
								);
								setComponents(newComponents);
							}}
						>
							Event ("When")
						</MenuItem>
						<MenuItem
							value={"Optional Feature"}
							onClick={() => {
								let newComponents = [...components];
								newComponents[i] = (
									<React.Fragment>
										<p>Where</p>
										<TextField
											id='outlined-basic'
											label='Feature is Included'
											variant='outlined'
											name='Feature'
										/>
									</React.Fragment>
								);
								setComponents(newComponents);
							}}
						>
							Optional ("Where")
						</MenuItem>
						<MenuItem
							value={"Unwanted Behaviour"}
							onClick={() => {
								let newComponents = [...components];
								newComponents[i] = (
									<React.Fragment>
										<p>If</p>
										<TextField
											id='outlined-basic'
											label='Trigger'
											variant='outlined'
											name='Trigger'
										/>
										<p>then the</p>
										<TextField
											id='outlined-basic'
											label='System Name'
											variant='outlined'
											name='System Name'
											required
										/>
									</React.Fragment>
								);
								setComponents(newComponents);
							}}
						>
							Unwanted ("If Then")
						</MenuItem>
						<MenuItem
							value={"System Name"}
							onClick={() => {
								let newComponents = [...components];
								newComponents[i] = (
									<React.Fragment>
										<p>, the</p>
										<TextField
											id='outlined-basic'
											label='system name'
											variant='outlined'
											name='System Name'
										/>
									</React.Fragment>
								);
								setComponents(newComponents);
							}}
						>
							System Name
						</MenuItem>
						<MenuItem
							value={"System Response"}
							onClick={() => {
								let newComponents = [...components];
								newComponents[i] = (
									<React.Fragment>
										<p>shall</p>
										<ResponseInput />
									</React.Fragment>
								);
								setComponents(newComponents);
							}}
						>
							System Response
						</MenuItem>
					</Select>
				</FormControl>
			))}

			<IconButton
				aria-label='add'
				onClick={() => {
					setComplexKeywords(complexKeywords + 1);
				}}
				sx={{ marginTop: "12px" }}
			>
				<AddIcon />
			</IconButton>
			<IconButton
				aria-label='add'
				onClick={() => {
					if (complexKeywords > 1) {
						setComplexKeywords(complexKeywords - 1);
						let newComponents = [...components];
						newComponents.pop();
						setComponents(newComponents);
					}
				}}
				sx={{ marginTop: "12px" }}
			>
				<RemoveIcon />
			</IconButton>
		</React.Fragment>
	);
};

export default ComplexBuilder;
