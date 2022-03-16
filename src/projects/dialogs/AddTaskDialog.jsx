import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

// Material-UI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import MobileDatePicker from "@mui/lab/MobileDatePicker";

import * as taskApis from "../../apis/task";

const AddTaskDialog = ({
	open,
	handleClose,
	totalTasks,
	projectId,
	addTaskComplete,
	projectUsers,
}) => {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChanged = (newDate) => {
		setSelectedDate(newDate);
	};

	const [selectedAsignees, setSelectedAsignees] = useState([]);

	const [userInputFields, setInputFields] = useState(1);
	const [dueDateEnabled, setDueDateEnabled] = useState(false);

	const queryClient = new useQueryClient();

	const projectMutation = useMutation(
		({ projectId, task }) => taskApis.addTask(projectId, task),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("fetchProjectData");
			},
		}
	);

	const addTask = (data) => {
		projectMutation.mutate({ projectId: projectId, task: data });
		addTaskComplete();
		handleClose();
	};

	const formatDate = (date) => {
		const day = String(date.getDate()).padStart(2, "0");
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const year = date.getFullYear();
		return day + "/" + month + "/" + year;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		let assigneeUsernames = [];

		Array.from({ length: userInputFields }, (x, i) => {
			assigneeUsernames.push({
				username: document
					.getElementById("assignee-select-" + String(i))
					.innerText.split(" - ")[1],
			});
		});

		const data = {
			taskKey: "T" + String(totalTasks + 1),
			title: document.getElementById("title-field").value,
			description: document.getElementById("description-field").value,
			status: "In Development",
			resolution: "Un-Resolved",
			type: document.getElementById("type-select").innerText,
			dateCreated: formatDate(new Date()),
			dateDue: dueDateEnabled ? formatDate(selectedDate) : "",
			assignees: assigneeUsernames,
			reporter: {
				userId: localStorage.getItem("userId"),
				name: localStorage.getItem("fullName"),
			},
		};

		addTask(data);
	};

	const handleSelectAssignee = (event, index) => {
		const username = event.target.dataset.value;
		if (username !== undefined) {
			if (selectedAsignees.length < index) {
				setSelectedAsignees([...selectedAsignees, username]);
			} else {
				let tempAssignees = [...selectedAsignees];
				tempAssignees[index] = username;
				setSelectedAsignees(tempAssignees);
			}
		}
	};

	const clearState = () => {
		setSelectedAsignees([]);
		setInputFields(1);
		setDueDateEnabled(false);
	};

	return (
		<Dialog
			open={open}
			onClose={() => {
				handleClose();
				clearState();
			}}
			aria-labelledby='form-dialog-title'
			fullWidth
		>
			<form onSubmit={handleSubmit} autoComplete='off'>
				<DialogContent>
					{/* Add user field */}
					<Typography sx={{ mt: 1, mb: 1 }} variant='h6' component='div'>
						Add task
					</Typography>

					<TextField
						variant='outlined'
						margin='normal'
						label='Title'
						id='title-field'
						name='title'
						required
						autoComplete='off'
						color='secondary'
						fullWidth
					/>

					<br />

					{[...Array(userInputFields)].map((e, i) => (
						<Box sx={{ minWidth: 120 }} key={i}>
							<br />
							<FormControl fullWidth>
								<InputLabel>Assignees</InputLabel>
								<Select
									required
									label='Type'
									defaultValue={""}
									id={"assignee-select-" + String(i)}
								>
									{projectUsers.map((user, x) => (
										<MenuItem
											key={x}
											onClick={(event) => {
												handleSelectAssignee(event, i);
											}}
											value={user.username}
											disabled={
												selectedAsignees.includes(user.username)
													? true
													: false
											}
										>
											{user.name} - {user.username}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
					))}

					<Tooltip title='Add another member'>
						<IconButton
							color='inherit'
							onClick={() => {
								setInputFields(userInputFields + 1);
							}}
						>
							<AddIcon />
						</IconButton>
					</Tooltip>

					<Tooltip title='Remove member'>
						<IconButton
							color='inherit'
							onClick={() => {
								if (userInputFields > 1) {
									setInputFields(userInputFields - 1);
									let tempSelectedAsignees = [...selectedAsignees];
									tempSelectedAsignees.pop();
									setSelectedAsignees(tempSelectedAsignees);
								}
							}}
						>
							<RemoveIcon />
						</IconButton>
					</Tooltip>

					<TextField
						variant='outlined'
						margin='normal'
						label='Description'
						id='description-field'
						name='description'
						autoComplete='off'
						color='secondary'
						fullWidth
					/>

					<br />
					<br />

					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<MobileDatePicker
							disabled={!dueDateEnabled}
							label='Date mobile'
							inputFormat='dd/MM/yyyy'
							value={selectedDate}
							onChange={handleDateChanged}
							renderInput={(params) => <TextField {...params} />}
						/>
					</LocalizationProvider>
					<br />
					<br />
					<Button
						variant='outlined'
						onClick={() => {
							setDueDateEnabled(!dueDateEnabled);
						}}
					>
						{dueDateEnabled ? "Remove due date" : "Add due date"}
					</Button>
					<br />
					<br />
					<Box sx={{ minWidth: 120 }}>
						<FormControl fullWidth>
							<InputLabel>Task Type</InputLabel>
							<Select id='type-select' required label='Type' defaultValue={""}>
								<MenuItem value={"New Feature"}>New Feature</MenuItem>
								<MenuItem value={"System Improvement"}>System Improvement</MenuItem>
								<MenuItem value={"Bug"}>Bug/system issue</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<br />
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							handleClose();
							clearState();
						}}
						color='inherit'
					>
						Cancel
					</Button>
					<Button
						type='submit'
						color='inherit'
						onClick={() => {
							clearState();
						}}
					>
						Create
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default AddTaskDialog;
