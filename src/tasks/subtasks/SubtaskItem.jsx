import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

export function Item({ id, subtaskStyle }) {
	return <div style={subtaskStyle}>{id}</div>;
}

const SubtaskItem = (props) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: props.id,
	});

	const theme = useTheme();

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const subtaskStyle = {
		width: "100%",
		display: "flex",
		alignItems: "center",
		padding: "5px",
		border: "1px solid black",
		borderRadius: "10px",
		margin: "10px 0",
		background: theme.palette.background.paper,
		color: theme.palette.text.primary,
	};

	return (
		<React.Fragment>
			{/* Only users who are assigned to the task can move tasks */}
			{props.currentUserIsAssigned ? (
				<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
					<Item id={props.id} subtaskStyle={subtaskStyle} />
				</div>
			) : (
				<Item id={props.id} subtaskStyle={subtaskStyle} />
			)}
			{props.currentUserIsAssigned ? (
				<React.Fragment>
					<Button
						color='secondary'
						onClick={() => {
							props.handlers.handleEditTask(props.index, props.columnName);
						}}
					>
						Edit
					</Button>
					<Button
						color='warning'
						onClick={() => {
							props.handlers.handleRemoveSubtask(props.index, props.columnName);
						}}
					>
						Remove
					</Button>
				</React.Fragment>
			) : null}
		</React.Fragment>
	);
};

export default SubtaskItem;
