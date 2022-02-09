import React, { useState } from "react";
import {
	DndContext,
	DragOverlay,
	closestCorners,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import Grid from "@mui/material/Grid";

import SubtaskContainer from "./SubtaskContainer";
import { Item } from "./SubtaskItem";

// const wrapperStyle = {
// 	display: "flex",
// 	flexDirection: "row",
// };

// Credit - https://codesandbox.io/s/lknfe

const defaultAnnouncements = {
	onDragStart(id) {
		// console.log(`Picked up draggable item ${id}.`);
	},
	onDragOver(id, overId) {
		if (overId) {
			// console.log(`Draggable item ${id} was moved over droppable area ${overId}.`);
			return;
		}

		// console.log(`Draggable item ${id} is no longer over a droppable area.`);
	},
	onDragEnd(id, overId) {
		if (overId) {
			// console.log(`Draggable item ${id} was dropped over droppable area ${overId}`);
			return;
		}

		// console.log(`Draggable item ${id} was dropped.`);
	},
	onDragCancel(id) {
		// console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
	},
};

const Subtasks = ({ tasks }) => {
	const [items, setItems] = useState(tasks);
	const [activeId, setActiveId] = useState();

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleEditTask = () => {
		prompt("Enter task details:");
	};

	const handleRemoveTask = () => {
		console.log("Remove");
	};

	return (
		// style={wrapperStyle}
		<div>
			<DndContext
				announcements={defaultAnnouncements}
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				<Grid container spacing={5}>
					<Grid item xs={12} md={4}>
						<SubtaskContainer
							id='toDo'
							items={items.toDo}
							columnName={"To Do"}
							handlers={{ handleEditTask, handleRemoveTask }}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<SubtaskContainer
							id='inProgress'
							items={items.inProgress}
							columnName={"In Progress"}
							handlers={{ handleEditTask, handleRemoveTask }}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<SubtaskContainer
							id='complete'
							items={items.complete}
							columnName={"Complete"}
							handlers={{ handleEditTask, handleRemoveTask }}
						/>
					</Grid>
				</Grid>
				<DragOverlay>{activeId ? <Item id={activeId} /> : null}</DragOverlay>
			</DndContext>
		</div>
	);

	function findContainer(id) {
		if (id in items) {
			return id;
		}

		return Object.keys(items).find((key) => items[key].includes(id));
	}

	function handleDragStart(event) {
		const { active } = event;
		const { id } = active;

		setActiveId(id);
	}

	function handleDragOver(event) {
		const { active, over, draggingRect } = event;
		const { id } = active;
		const { id: overId } = over;

		// Find the containers
		const activeContainer = findContainer(id);
		const overContainer = findContainer(overId);

		if (!activeContainer || !overContainer || activeContainer === overContainer) {
			return;
		}

		setItems((prev) => {
			const activeItems = prev[activeContainer];
			const overItems = prev[overContainer];

			// Find the indexes for the items
			const activeIndex = activeItems.indexOf(id);
			const overIndex = overItems.indexOf(overId);

			let newIndex;
			if (overId in prev) {
				// We're at the root droppable of a container
				newIndex = overItems.length + 1;
			} else {
				const isBelowLastItem =
					over &&
					overIndex === overItems.length - 1 &&
					draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

				const modifier = isBelowLastItem ? 1 : 0;

				newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
			}

			return {
				...prev,
				[activeContainer]: [
					...prev[activeContainer].filter((item) => item !== active.id),
				],
				[overContainer]: [
					...prev[overContainer].slice(0, newIndex),
					items[activeContainer][activeIndex],
					...prev[overContainer].slice(newIndex, prev[overContainer].length),
				],
			};
		});
	}

	function handleDragEnd(event) {
		const { active, over } = event;
		const { id } = active;
		const { id: overId } = over;

		const activeContainer = findContainer(id);
		const overContainer = findContainer(overId);

		if (!activeContainer || !overContainer || activeContainer !== overContainer) {
			return;
		}

		const activeIndex = items[activeContainer].indexOf(active.id);
		const overIndex = items[overContainer].indexOf(overId);

		if (activeIndex !== overIndex) {
			setItems((items) => ({
				...items,
				[overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
			}));
		}

		setActiveId(null);
	}
};

export default Subtasks;
