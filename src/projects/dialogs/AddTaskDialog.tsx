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
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import * as projectApis from "../../apis/project";

const AddTaskDialog = ({ open, handleClose, totalTasks, projectId, addTaskComplete }) => {
	const [selectedDate, setSelectedDate] = useState(new Date());

	const handleDateChanged = (newDate) => {
		setSelectedDate(newDate);
	};

	const [userInputFields, setInputFields] = useState(1);
	const [dueDateEnabled, setDueDateEnabled] = useState(false);

	const queryClient = new useQueryClient();

	const projectMutation = useMutation(
		({ projectId, task }) => projectApis.addTask(projectId, task),
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

		let assignees = [];

		Array.from({ length: userInputFields }, (x, i) => {
			assignees.push({
				username: document.getElementById("assignee-field-" + String(i)).value,
			});
		});

		const data = {
			taskKey: "T" + String(totalTasks + 1),
			title: document.getElementById("title-field").value,
			description: document.getElementById("description-field").value,
			status: "Open",
			resolution: "Unresolved",
			type: document.getElementById("type-select").innerText,
			dateCreated: formatDate(new Date()),
			dateDue: dueDateEnabled ? formatDate(selectedDate) : "",
			assignees: assignees,
			reporter: {
				userId: localStorage.getItem("userId"),
				name: localStorage.getItem("fullName"),
			},
		};

		addTask(data);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
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
					{[...Array(userInputFields)].map((e, i) => (
						<TextField
							key={i}
							variant='outlined'
							margin='normal'
							label='Assignee Username'
							id={"assignee-field-" + String(i)}
							name='assignee'
							required
							autoComplete='off'
							color='secondary'
							fullWidth
						/>
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
							<Select
								id='type-select'
								required
								label='Type'
								defaultValue={""}
							>
								<MenuItem value={"New Feature"}>New Feature</MenuItem>
								<MenuItem value={"System Improvement"}>
									System Improvement
								</MenuItem>
								<MenuItem value={"Bug"}>Bug/system issue</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<br />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='inherit'>
						Cancel
					</Button>
					<Button type='submit' color='inherit'>
						Create
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default AddTaskDialog;
