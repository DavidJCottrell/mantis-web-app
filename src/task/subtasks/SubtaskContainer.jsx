import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

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

import SubtaskItem from "./SubtaskItem";

export default function SubtaskContainer(props) {
	const { id, items, columnName, handlers } = props;

	const { setNodeRef } = useDroppable({
		id,
	});

	return (
		<SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
			<Card ref={setNodeRef} sx={{ minWidth: 275 }}>
				<CardContent>
					<Typography variant='h5' component='div'>
						{columnName}
					</Typography>
					{items.map((id) => (
						<SubtaskItem key={id} id={id} handlers={handlers} />
					))}
					<br />
					<Button variant='contained' color='secondary'>
						Add Task
					</Button>
				</CardContent>
			</Card>
		</SortableContext>
	);
}
