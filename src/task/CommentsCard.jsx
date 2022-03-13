import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

// Material-UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import * as taskApis from "../apis/task";
import { useMutation, useQueryClient } from "react-query";

const CommentsCard = ({ comments, projectId, taskId }) => {
	const queryClient = new useQueryClient();

	const addCommentMutation = useMutation(
		({ projectId, taskId, comment }) => taskApis.addTaskComment(projectId, taskId, comment),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("fetchTaskComments");
			},
		}
	);

	const handleSubmit = () => {
		const commentContent = document.getElementById("comment-field").value;

		const comment = {
			authorName: localStorage.getItem("fullName"),
			authorId: localStorage.getItem("userId"),
			content: commentContent,
			taggedUsers: [],
		};

		addCommentMutation.mutate({
			projectId: projectId,
			taskId: taskId,
			comment: comment,
		});
	};

	return (
		<Card sx={{ minWidth: 275 }}>
			<CardContent>
				<Typography variant='h5' component='div'>
					Comments
				</Typography>

				{comments.map((comment, i) => (
					<React.Fragment key={i}>
						<br />
						<Card style={{ backgroundColor: "white", color: "black" }}>
							<CardContent>
								<Typography sx={{ fontSize: 14 }} gutterBottom>
									<b>{comment.authorName}</b>
								</Typography>
								<Typography variant='body2'>{comment.content}</Typography>
							</CardContent>
							<CardActions>
								<Button
									color='secondary'
									// onClick={() => {
									// 	props.handlers.handleEditTask(
									// 		props.index,
									// 		props.columnName
									// 	);
									// }}
								>
									Edit
								</Button>
								<Button
									color='warning'
									// onClick={() => {
									// 	props.handlers.handleRemoveSubtask(
									// 		props.index,
									// 		props.columnName
									// 	);
									// }}
								>
									Remove
								</Button>
							</CardActions>
						</Card>
					</React.Fragment>
				))}

				<br />
				<hr />
				<br />

				<TextField id='comment-field' label='New Comment' multiline rows={3} fullWidth />
			</CardContent>
			<CardActions>
				<Button size='small' onClick={handleSubmit}>
					Add Comment
				</Button>
			</CardActions>
		</Card>
	);
};

export default CommentsCard;
