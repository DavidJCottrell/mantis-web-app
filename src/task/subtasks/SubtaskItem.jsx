import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import Button from "@mui/material/Button";

export function Item(props) {
	const { id } = props;

	const style = {
		width: "100%",
		display: "flex",
		alignItems: "center",
		padding: "5px",
		border: "1px solid black",
		margin: "10px 0",
		background: "white",
		color: "black",
	};

	return <div style={style}>{id}</div>;
}

const SubtaskItem = (props) => {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: props.id,
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<React.Fragment>
			<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
				<Item id={props.id} />
			</div>
			<Button color='secondary' onClick={props.handlers.handleEditTask}>
				Edit
			</Button>
			<Button color='warning' onClick={props.handlers.handleRemoveTask}>
				Remove
			</Button>
		</React.Fragment>
	);
};

export default SubtaskItem;
