import React from "react";

// Material-UI
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib

import toast, { Toaster } from "react-hot-toast";

const AddTaskDialog = ({ open, handleClose, projectId, totalTasks }) => {
	const today = new Date();
	const day = String(today.getDate()).padStart(2, "0");
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const year = today.getFullYear();

	const currentDate = day + "/" + month + "/" + year;
	const [chosenDate, setChosenDate] = React.useState(currentDate);

	const handleChange = (newDate) => {
		setChosenDate(newDate);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// JT343254

		const type = document.getElementById("type-select").innerText;
		const title = document.getElementById("title-field").value;
		const assigneeUsername =
			document.getElementById("assignee-field").value;
		const description = document.getElementById("description-field").value;

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
				assignee: {
					username: assigneeUsername,
				},
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
						<TextField
							variant='outlined'
							margin='normal'
							label='Assignee Username'
							id='assignee-field'
							name='assignee'
							required
							autoComplete='off'
							color='secondary'
							fullWidth
						/>
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
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<DatePicker
								disableToolbar
								variant='inline'
								label='Only calendar'
								helperText='No year selection'
								value={chosenDate}
								onChange={handleChange}
							/>
						</MuiPickersUtilsProvider>
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
