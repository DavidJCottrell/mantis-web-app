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
import TextField from "@mui/material/TextField";

import RequirementForm from "./RequirementForm";

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

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='form-dialog-title'
			fullWidth
		>
			<form autoComplete='off'>
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
					<Button variant='outlined'>Submit</Button>
					<Button onClick={handleClose} color='inherit'>
						Close
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default RequirementDialog;
