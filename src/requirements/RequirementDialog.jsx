import React, { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

import RequirementForm from "./RequirementForm";

import * as Collectors from "./Collectors";

// Ubiquitous - The <system name> shall <system response(s)>
// State driven - While the <precondition(s)>, the <system name> shall <system response(s)> (WHILE)
// Event driven - When <trigger>, the <system name> shall <system response(s)> (WHEN)
// Optional feature - Where <feature is included>, the <system name> shall <system response(s)> (WHERE)
// Unwanted behaviour - If <trigger>, then the <system name> shall <system response(s)> (IF THEN)

// Complex <- Allows customization of keywords

const RequirementDialog = ({ open, handleClose, requirement }) => {
	const [reqType, setReqType] = useState(null);

	const handleTypeChange = (event) => {
		setReqType(event.target.value);
	};

	const close = () => {
		setReqType(null);
		handleClose();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = document.getElementById("req-form");

		let requirement;

		if (
			form.elements["System Name"] !== undefined &&
			form.elements["System Responses"] !== undefined
		) {
			switch (reqType) {
				case "Ubiquitous":
					requirement = Collectors.collectUbiquitous(form.elements, reqType);
					break;
				case "State Driven":
					requirement = Collectors.collectStateDriven(form.elements, reqType);
					break;
				case "Event Driven":
					requirement = Collectors.collectEventDrivenOrUnwanted(
						form.elements,
						reqType
					);
					break;
				case "Optional Feature":
					requirement = Collectors.collectOptionalFeature(
						form.elements,
						reqType
					);
					break;
				case "Unwanted Behaviour":
					requirement = Collectors.collectEventDrivenOrUnwanted(
						form.elements,
						reqType
					);
					break;
				case "Complex":
					requirement = Collectors.collectComplex(form.elements, reqType);
					break;
			}
			console.log(requirement);
		} else {
			console.log("Missing essential elements");
		}
	};

	return (
		<Dialog open={open} onClose={close} aria-labelledby='form-dialog-title' fullWidth>
			<DialogContent>
				<Typography sx={{ mt: 1, mb: 1 }} variant='h6' component='div'>
					Requirement
				</Typography>
				<Box sx={{ minWidth: 120, p: 2 }}>
					<FormControl fullWidth>
						<InputLabel>Type</InputLabel>
						<Select
							id='type-select'
							required
							label='Type'
							defaultValue={""}
							onChange={handleTypeChange}
						>
							<MenuItem
								value={"Ubiquitous"}
								onClick={() => {
									setReqType("Ubiquitous");
								}}
							>
								Ubiquitous
							</MenuItem>
							<MenuItem
								value={"State Driven"}
								onClick={() => {
									setReqType("State Driven");
								}}
							>
								State Driven
							</MenuItem>
							<MenuItem
								value={"Event Driven"}
								onClick={() => {
									setReqType("Event Driven");
								}}
							>
								Event Driven
							</MenuItem>
							<MenuItem
								value={"Optional Feature"}
								onClick={() => {
									setReqType("Optional Feature");
								}}
							>
								Optional Feature
							</MenuItem>
							<MenuItem
								value={"Unwanted Behaviour"}
								onClick={() => {
									setReqType("Unwanted Behaviour");
								}}
							>
								Unwanted Behaviour
							</MenuItem>
							<MenuItem
								value={"Complex"}
								onClick={() => {
									setReqType("Complex");
								}}
							>
								Complex
							</MenuItem>
						</Select>
					</FormControl>
					<br />
					<br />
					<RequirementForm reqType={reqType} />
				</Box>
			</DialogContent>
			<DialogActions>
				<Button variant='outlined' onClick={handleSubmit}>
					Submit
				</Button>
				<Button onClick={close} color='inherit'>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default RequirementDialog;
