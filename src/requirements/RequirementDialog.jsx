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
import * as requirementApis from "../apis/requirement";

import toast, { Toaster } from "react-hot-toast";

// Ubiquitous - The <system name> shall <system response(s)>
// State driven - While the <precondition(s)>, the <system name> shall <system response(s)> (WHILE)
// Event driven - When <trigger>, the <system name> shall <system response(s)> (WHEN)
// Optional feature - Where <feature is included>, the <system name> shall <system response(s)> (WHERE)
// Unwanted behaviour - If <trigger>, then the <system name> shall <system response(s)> (IF THEN)

// Complex <- Allows customization of keywords

const RequirementDialog = ({ open, handleClose, requirement, projectId, totalRequirements }) => {
	const [reqType, setReqType] = useState("");

	useEffect(() => {
		setReqType(requirement ? requirement.type : "");
	}, [requirement]);

	const addRequirementMutation = useMutation(
		({ projectId, requirement }) => requirementApis.addRequirement(projectId, requirement),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("fetchProjectRequirements");
			},
		}
	);

	const updateRequirementMutation = useMutation(
		({ projectId, requirementIndex, requirement }) =>
			requirementApis.updateRequirement(projectId, requirementIndex, requirement),
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

	const saveNewRequirement = (requirementData) => {
		requirementData["index"] = "REQ-" + String(totalRequirements + 1);
		addRequirementMutation.mutate({
			projectId: projectId,
			requirement: requirementData,
		});
		toast.success("Requirement Added");
	};

	const updateRequirement = (requirementData) => {
		requirementData["index"] = requirement.index;
		updateRequirementMutation.mutate({
			projectId: projectId,
			requirementIndex: requirementData.index,
			requirement: requirementData,
		});
		toast.success("Requirement Updated");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = document.getElementById("req-form");

		let requirementData;
		switch (reqType) {
			case "Ubiquitous":
				requirementData = Collectors.collectUbiquitous(form.elements, reqType);
				break;
			case "State Driven":
				requirementData = Collectors.collectStateDriven(form.elements, reqType);
				break;
			case "Event Driven":
				requirementData = Collectors.collectEventDrivenOrUnwanted(form.elements, reqType);
				break;
			case "Optional Feature":
				requirementData = Collectors.collectOptionalFeature(form.elements, reqType);
				break;
			case "Unwanted Behaviour":
				requirementData = Collectors.collectEventDrivenOrUnwanted(form.elements, reqType);
				break;
			case "Complex":
				requirementData = Collectors.collectComplex(
					form.elements,
					complexComponents,
					reqType
				);
				break;
		}

		if (requirement) updateRequirement(requirementData);
		else saveNewRequirement(requirementData);

		handleClose();
	};

	return (
		<React.Fragment>
			<Toaster />
			<Dialog open={open} onClose={close} aria-labelledby='form-dialog-title' fullWidth>
				<DialogContent>
					<Typography sx={{ mt: 1, mb: 1 }} variant='h6' component='div'>
						Requirement
					</Typography>
					<Box sx={{ minWidth: 120, p: 2 }}>
						<Typography sx={{ mt: 1, mb: 1 }} variant='p' component='div'>
							{requirement ? requirement.index + " - " + requirement.type : null}
						</Typography>
						{!requirement ? (
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
						) : null}

						{!requirement ? (
							<div>
								<br />
								<br />
							</div>
						) : null}

						<RequirementForm
							reqType={reqType}
							complexComponents={complexComponents}
							setComplexComponents={setComplexComponents}
							requirement={requirement}
							handleSubmit={handleSubmit}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={close} color='inherit'>
						Close
					</Button>
					<Button variant='outlined' form='req-form' type='submit'>
						{requirement ? "Update" : "Submit"}
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

export default RequirementDialog;
