import React from "react";

import { useMutation, useQueryClient } from "react-query";

// Material-UI
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import * as projectApis from "../../apis/project";

const SettingsDialog = ({ open, handleClose, projectId }) => {
	const queryClient = useQueryClient();

	const projectMutation = useMutation(
		(projectId) => projectApis.deleteProject(projectId),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("fetchProjects");
			},
		}
	);

	const deleteProject = (e) => {
		e.preventDefault();
		if (window.confirm("Are you sure you want to delete this project?")) {
			projectMutation.mutate(projectId);
			handleClose();
			window.location.href = "/";
		}
	};

	return (
		<React.Fragment>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
				fullWidth
			>
				<form autoComplete='off'>
					<DialogContent>
						<Typography sx={{ mt: 1, mb: 1 }} variant='h6' component='div'>
							Settings
						</Typography>
						<Button
							variant='outlined'
							color='warning'
							onClick={deleteProject}
						>
							Delete project
						</Button>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color='inherit'>
							Close
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</React.Fragment>
	);
};

export default SettingsDialog;
