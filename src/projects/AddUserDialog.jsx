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

import toast, { Toaster } from "react-hot-toast";

// -- Custom components --
import AddUserField from "../common/AddUserField";

const AddProjectDialog = ({ open, handleClose, projectId }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		const role = document.getElementById("role-select").innerText;
		const username = document.getElementById("username-field").value;

		var config = {
			method: "post",
			url: "http://localhost:9000/project/adduser",
			headers: { "auth-token": localStorage.getItem("auth-token") },
			data: {
				projectId: String(projectId),
				username: String(username),
				role: String(role),
			},
		};

		axios(config)
			.then((res) => {
				toast.success(res.data.message);
				handleClose();
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
						<AddUserField required={true} />
						<Box sx={{ minWidth: 120 }}>
							<FormControl fullWidth>
								<InputLabel>Role</InputLabel>
								<Select
									id='role-select'
									required
									label='Role'
									defaultValue={""}
								>
									<MenuItem value={"Team Leader"}>
										Team Leader
									</MenuItem>
									<MenuItem value={"Developer"}>
										Developer
									</MenuItem>
									<MenuItem value={"Client"}>Client</MenuItem>
								</Select>
							</FormControl>
						</Box>
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

export default AddProjectDialog;
