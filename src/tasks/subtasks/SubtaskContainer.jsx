import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

// Material-UI
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import SubtaskItem from "./SubtaskItem";

export default function SubtaskContainer({
	id,
	items,
	columnName,
	handlers,
	currentUserIsAssigned,
}) {
	const { setNodeRef } = useDroppable({ id });

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
							currentUserIsAssigned={currentUserIsAssigned}
						/>
					))}
					<br />
					{currentUserIsAssigned ? (
						<Button
							variant='contained'
							color='secondary'
							onClick={() => {
								handlers.handleAdd(columnName);
							}}
						>
							Add Task
						</Button>
					) : null}
				</CardContent>
			</Card>
		</SortableContext>
	);
}
