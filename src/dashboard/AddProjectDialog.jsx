import { useMutation, useQueryClient } from "react-query";

// MUI
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import toast from "react-hot-toast";
import * as projectApis from "../apis/project";

const AddProjectDialog = ({ open, handleClose }) => {
	const queryClient = useQueryClient();

	// Add project mutation
	const projectMutation = useMutation(projectApis.addProject, {
		onSuccess: () => {
			queryClient.invalidateQueries("fetchProjects");
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = document.getElementById("add-project-form");
		projectMutation.mutate({
			title: form.projectTitle.value,
			users: [],
			tasks: [],
			githubURL: form.githubURL.value,
			description: form.description.value,
		});
		toast.success("Project added!");
		handleClose();
	};
	return (
		<Dialog open={open} onClose={handleClose} fullWidth>
			<DialogTitle>Create project</DialogTitle>
			<form onSubmit={handleSubmit} autoComplete='off' id='add-project-form'>
				<DialogContent>
					<Typography variant='subtitle1'>Project details</Typography>
					<Divider />

					{/* Project title field */}
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						label='Title'
						name='projectTitle'
						autoComplete='off'
						color='secondary'
					/>
					{/* Description field */}
					<TextField
						variant='outlined'
						margin='normal'
						fullWidth
						label='Description'
						name='description'
						autoComplete='off'
						color='secondary'
					/>
					{/* Project github url field */}
					<TextField
						variant='outlined'
						margin='normal'
						fullWidth
						label='GitHub repository URL'
						name='githubURL'
						autoComplete='off'
						color='secondary'
					/>
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

export default AddProjectDialog;
