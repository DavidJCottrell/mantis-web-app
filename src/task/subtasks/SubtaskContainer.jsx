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

export default function SubtaskContainer({ id, items, columnName, handlers }) {
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
					{items.map((id, i) => (
						<SubtaskItem
							key={String(id) + String(i)}
							id={id}
							index={i}
							handlers={handlers}
							columnName={columnName}
						/>
					))}
					<br />
					<Button
						variant='contained'
						color='secondary'
						onClick={() => {
							handlers.handleAdd(columnName);
						}}
					>
						Add Task
					</Button>
				</CardContent>
			</Card>
		</SortableContext>
	);
}
