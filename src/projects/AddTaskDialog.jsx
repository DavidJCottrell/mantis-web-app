import React, { useState } from "react";

// Material-UI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import toast, { Toaster } from "react-hot-toast";

const AddTaskDialog = ({ open, handleClose, projectId, totalTasks }) => {
	const today = new Date();
	const day = String(today.getDate()).padStart(2, "0");
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const year = today.getFullYear();

	const currentDate = day + "/" + month + "/" + year;
	const [selectedDate, handleDateChange] = useState(new Date());

	const handleChange = (newDate) => {
		console.log(newDate);
		// setChosenDate(newDate);
	};

	const [userInputFields, setInputFields] = useState(1);
	const [dueDateEnabled, setDueDateEnabled] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		const type = document.getElementById("type-select").innerText;
		const title = document.getElementById("title-field").value;
		const description = document.getElementById("description-field").value;
		const dateDue = dueDateEnabled
			? document.getElementById("dueDate-selector").value
			: "";

		let assignees = [];

		Array.from({ length: userInputFields }, (x, i) => {
			assignees.push({
				username: document.getElementById("assignee-field-" + String(i))
					.value,
			});
		});

		const config = {
			method: "patch",
			url: "http://localhost:9000/project/addtask/" + String(projectId),
			headers: { "auth-token": localStorage.getItem("auth-token") },
			data: {
				taskKey: "T" + String(totalTasks + 1),
				title: title,
				description: description,
				status: "Open",
				resolution: "Unresolved",
				type: type,
				dateCreated: currentDate,
				dateDue: dateDue,
				assignees: assignees,
				reporter: {
					userId: localStorage.getItem("user-id"),
					name: localStorage.getItem("fullname"),
				},
			},
		};

		axios(config)
			.then((res) => {
				toast.success(res.data.message);
				handleClose();
				window.location.reload();
			})
			.catch((e) => {
				toast.error(e.response.data);
			});
	};

	return (
		<React.Fragment>
			<Toaster />
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
				fullWidth
			>
				<form onSubmit={handleSubmit} autoComplete='off'>
					<DialogContent>
						{/* Add user field */}
						<Typography variant='subtitle1'>Add a task</Typography>
						<Divider />
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
						{/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
							<KeyboardDatePicker
								clearable
								disablePast
								disabled={!dueDateEnabled}
								value={selectedDate}
								onChange={(date) => handleDateChange(date)}
								placeholder={currentDate}
								minDate={new Date()}
								format='dd/MM/yyyy'
								id='dueDate-selector'
							/>
						</MuiPickersUtilsProvider> */}
						<br />
						<br />
						<Button
							variant='outlined'
							onClick={() => {
								setDueDateEnabled(!dueDateEnabled);
							}}
						>
							{dueDateEnabled
								? "Remove due date"
								: "Add due date"}
						</Button>

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
									<MenuItem value={"New Feature"}>
										New Feature
									</MenuItem>
									<MenuItem value={"System Improvement"}>
										System Improvement
									</MenuItem>
									<MenuItem value={"Bug"}>
										Bug/system issue
									</MenuItem>
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
		</React.Fragment>
	);
};

export default AddTaskDialog;
