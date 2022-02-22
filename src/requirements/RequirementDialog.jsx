import React, { useState, useEffect } from "react";

import { useMutation, useQueryClient } from "react-query";

// MUI
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
import * as projectApis from "../apis/project";

import toast, { Toaster } from "react-hot-toast";

// Ubiquitous - The <system name> shall <system response(s)>
// State driven - While the <precondition(s)>, the <system name> shall <system response(s)> (WHILE)
// Event driven - When <trigger>, the <system name> shall <system response(s)> (WHEN)
// Optional feature - Where <feature is included>, the <system name> shall <system response(s)> (WHERE)
// Unwanted behaviour - If <trigger>, then the <system name> shall <system response(s)> (IF THEN)

// Complex <- Allows customization of keywords

const RequirementDialog = ({
	open,
	handleClose,
	requirement,
	projectId,
	totalRequirements,
}) => {
	const [reqType, setReqType] = useState("");

	useEffect(() => {
		setReqType(requirement ? requirement.type : "");
	}, [requirement]);

	const projectMutation = useMutation(
		({ projectId, requirement }) =>
			projectApis.addRequirement(projectId, requirement),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("fetchProjectRequirements");
			},
		}
	);

	const [complexComponents, setComplexComponents] = useState([]);

	const queryClient = new useQueryClient();

	const close = () => {
		setComplexComponents([]);
		handleClose();
	};

	const handleTypeChange = (event) => {
		setReqType(event.target.value);
	};

	const handleSelectClick = (type) => {
		setReqType(type);
		setComplexComponents([]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = document.getElementById("req-form");

		let requirementData;

		if (
			form.elements["System Name"].value !== "" &&
			form.elements["System Responses"].value !== ""
		) {
			switch (reqType) {
				case "Ubiquitous":
					requirementData = Collectors.collectUbiquitous(
						form.elements,
						reqType
					);
					break;
				case "State Driven":
					requirementData = Collectors.collectStateDriven(
						form.elements,
						reqType
					);
					break;
				case "Event Driven":
					requirementData = Collectors.collectEventDrivenOrUnwanted(
						form.elements,
						reqType
					);
					break;
				case "Optional Feature":
					requirementData = Collectors.collectOptionalFeature(
						form.elements,
						reqType
					);
					break;
				case "Unwanted Behaviour":
					requirementData = Collectors.collectEventDrivenOrUnwanted(
						form.elements,
						reqType
					);
					break;
				case "Complex":
					requirementData = Collectors.collectComplex(
						form.elements,
						complexComponents,
						reqType
					);
					break;
			}
			requirementData["index"] = "REQ-" + String(totalRequirements + 1);
			projectMutation.mutate({
				projectId: projectId,
				requirement: requirementData,
			});
			handleClose();
			toast.success("Requirement Added");
		} else {
			toast.error("Missing essential keywords");
		}
	};

	return (
		<React.Fragment>
			<Toaster />
			<Dialog
				open={open}
				onClose={close}
				aria-labelledby='form-dialog-title'
				fullWidth
			>
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
								value={reqType}
								onChange={handleTypeChange}
							>
								<MenuItem
									value={"Ubiquitous"}
									onClick={() => {
										handleSelectClick("Ubiquitous");
									}}
								>
									Ubiquitous
								</MenuItem>
								<MenuItem
									value={"State Driven"}
									onClick={() => {
										handleSelectClick("State Driven");
									}}
								>
									State Driven
								</MenuItem>
								<MenuItem
									value={"Event Driven"}
									onClick={() => {
										handleSelectClick("Event Driven");
									}}
								>
									Event Driven
								</MenuItem>
								<MenuItem
									value={"Optional Feature"}
									onClick={() => {
										handleSelectClick("Optional Feature");
									}}
								>
									Optional Feature
								</MenuItem>
								<MenuItem
									value={"Unwanted Behaviour"}
									onClick={() => {
										handleSelectClick("Unwanted Behaviour");
									}}
								>
									Unwanted Behaviour
								</MenuItem>
								<MenuItem
									value={"Complex"}
									onClick={() => {
										handleSelectClick("Complex");
									}}
								>
									Complex
								</MenuItem>
							</Select>
						</FormControl>
						<br />
						<br />
						<RequirementForm
							reqType={reqType}
							complexComponents={complexComponents}
							setComplexComponents={setComplexComponents}
							requirement={requirement}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={close} color='inherit'>
						Close
					</Button>
					<Button variant='outlined' onClick={handleSubmit}>
						{requirement ? "Update" : "Submit"}
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default RequirementDialog;
