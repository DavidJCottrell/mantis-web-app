import React, { useState, useEffect } from "react";

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

const ComplexBuilder = ({ setComponents, components, requirement }) => {
	let count = 1;
	if (requirement) {
		count = 2; // must have a system name and a system response
		if (requirement.trigger !== "") count++;
		if (requirement.feature !== "") count++;
		if (requirement.preconditions !== "") count++;
	}

	useEffect(() => {
		if (requirement) {
			let comps = [];
			for (let type of requirement.order) comps.push(getComponent(type));
			setComponents(comps);
		}
	}, [requirement]);

	const [complexKeywords, setComplexKeywords] = useState(count);

	const getComponent = (type) => {
		let newComponent;
		switch (type) {
			case "Preconditions":
				newComponent = {
					type: "Preconditions",
					element: (
						<React.Fragment>
							<p>While the</p>
							<PreconditionInput
								preconditions={
									requirement ? requirement.preconditions : undefined
								}
							/>
						</React.Fragment>
					),
				};
				break;
			case "Trigger":
				newComponent = {
					type: "Trigger",
					element: (
						<React.Fragment>
							<p>When</p>
							<TextField
								id='outlined-basic'
								label='Trigger'
								variant='outlined'
								name='Trigger'
								defaultValue={requirement ? requirement.trigger : ""}
							/>
						</React.Fragment>
					),
				};
				break;
			case "Feature":
				newComponent = {
					type: "Feature",
					element: (
						<React.Fragment>
							<p>Where</p>
							<TextField
								id='outlined-basic'
								label='Feature is Included'
								variant='outlined'
								name='Feature'
								defaultValue={requirement ? requirement.feature : ""}
							/>
						</React.Fragment>
					),
				};
				break;
			case "Unwanted Trigger":
				newComponent = {
					type: "Unwanted Trigger",
					element: (
						<React.Fragment>
							<p>If</p>
							<TextField
								id='outlined-basic'
								label='Unwanted Trigger'
								variant='outlined'
								name='Unwanted Trigger'
								defaultValue={requirement ? requirement.trigger : ""}
							/>
							<p>then the</p>
							<TextField
								id='outlined-basic'
								label='System Name'
								variant='outlined'
								name='System Name'
								defaultValue={requirement ? requirement.systemName : ""}
								required
							/>
						</React.Fragment>
					),
				};
				break;
			case "System Name":
				newComponent = {
					type: "System Name",
					element: (
						<React.Fragment>
							<p>, the</p>
							<TextField
								id='outlined-basic'
								label='system name'
								variant='outlined'
								name='System Name'
								defaultValue={requirement ? requirement.systemName : ""}
							/>
						</React.Fragment>
					),
				};
				break;
			case "System Response":
				newComponent = {
					type: "System Response",
					element: (
						<React.Fragment>
							<p>shall</p>
							<ResponseInput
								responses={
									requirement ? requirement.systemResponses : undefined
								}
							/>
						</React.Fragment>
					),
				};
				break;
		}
		return newComponent;
	};

	return (
		<React.Fragment>
			{[...Array(complexKeywords)].map((e, i) => (
				<FormControl
					sx={{ minWidth: "150px", marginRight: "10px" }}
					variant='standard'
					key={i}
				>
					<InputLabel>Keyword {i + 1}</InputLabel>
					<Select
						id='keyword-select'
						label='Type'
						defaultValue={requirement ? requirement.order[i] : ""}
					>
						<MenuItem
							value={"Preconditions"}
							onClick={() => {
								let newComponents = [...components];
								newComponents[i] = getComponent("Preconditions");
								setComponents(newComponents);
							}}
						>
							State ('While')
						</MenuItem>
						<MenuItem
							value={"Trigger"}
							onClick={() => {
								let newComponents = [...components];
								newComponents[i] = getComponent("Trigger");
								setComponents(newComponents);
							}}
						>
							Event ("When")
						</MenuItem>
						<MenuItem
							value={"Feature"}
							onClick={() => {
								let newComponents = [...components];
								newComponents[i] = getComponent("Feature");
								setComponents(newComponents);
							}}
						>
							Optional ("Where")
						</MenuItem>
						<MenuItem
							value={"Unwanted Feature"}
							onClick={() => {
								let newComponents = [...components];
								newComponents[i] = getComponent("Unwanted Trigger");
								setComponents(newComponents);
							}}
						>
							Unwanted ("If Then")
						</MenuItem>
						<MenuItem
							value={"System Name"}
							onClick={() => {
								let newComponents = [...components];
								newComponents[i] = getComponent("System Name");
								setComponents(newComponents);
							}}
						>
							System Name
						</MenuItem>
						<MenuItem
							value={"System Response"}
							onClick={() => {
								let newComponents = [...components];
								newComponents[i] = getComponent("System Response");
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
					// setComponents(newComponents);
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
