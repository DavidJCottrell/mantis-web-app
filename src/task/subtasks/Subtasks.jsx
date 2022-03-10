import React, { useEffect, useState } from "react";
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

import * as projectApis from "../../apis/project";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";

import toast, { Toaster } from "react-hot-toast";

// Credit - https://codesandbox.io/s/lknfe

const Subtasks = ({ subTasks, projectId, taskId }) => {
	const [items, setItems] = useState(subTasks);
	const [activeId, setActiveId] = useState();
	const [columnToAddTo, setColumnToAddTo] = useState("");

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const [addSubTaskAnchor, setAddSubTaskAnchor] = useState(); //State
	const handleAddSubTaskOpen = (event) => setAddSubTaskAnchor(event.currentTarget); //Handle open
	const handleAddSubTaskClose = () => setAddSubTaskAnchor(null); //Handle close
	const isAddSubTaskOpen = Boolean(addSubTaskAnchor); //Is open

	const queryClient = new useQueryClient();

	const updateSubtasksMutation = useMutation(
		({ projectId, taskId, subTasks }) =>
			projectApis.updateSubtasks(projectId, taskId, subTasks),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("fetchSubTasks");
			},
		}
	);

	const handleAdd = (columnName) => {
		const newText = prompt("Subtask:");

		if (newText !== null) {
			switch (columnName) {
				case "To Do":
					let newToDoTasks = items["toDo"].slice();
					newToDoTasks.push(newText);
					setItems({ ...items, ["toDo"]: newToDoTasks });
					break;
				case "In Progress":
					let newInProgressTasks = items["inProgress"].slice();
					newInProgressTasks.push(newText);
					setItems({ ...items, ["inProgress"]: newInProgressTasks });
					break;
				case "Complete":
					let newCompleteTasks = items["complete"].slice();
					newCompleteTasks.push(newText);
					setItems({ ...items, ["complete"]: newCompleteTasks });
					break;
			}
			toast.success("Subtask Added");
		}
	};

	const handleEditTask = (index, columnName) => {
		let newText = "";
		switch (columnName) {
			case "To Do":
				let newToDoTasks = items["toDo"].slice();
				newText = prompt("Subtask:", items["toDo"][index]);
				if (newText !== null) {
					newToDoTasks[index] = newText;
					setItems({ ...items, ["toDo"]: newToDoTasks });
				}
				break;
			case "In Progress":
				let newInProgressTasks = items["inProgress"].slice();
				newText = prompt("Subtask:", items["toDo"][index]);
				if (newText !== null) {
					newInProgressTasks[index] = newText;
					setItems({ ...items, ["inProgress"]: newInProgressTasks });
				}
				break;
			case "Complete":
				let newCompleteTasks = items["complete"].slice();
				newText = prompt("Subtask:", items["complete"][index]);
				if (newText !== null) {
					newCompleteTasks[index] = newText;
					setItems({ ...items, ["complete"]: newCompleteTasks });
				}
				break;
		}
	};

	const handleRemoveSubtask = (index, columnName) => {
		if (confirm("Are you sure you want to delete this subtask?")) {
			switch (columnName) {
				case "To Do":
					let newToDoTasks = items["toDo"].slice();
					newToDoTasks.splice(index, 1);
					setItems({ ...items, ["toDo"]: newToDoTasks });
					break;
				case "In Progress":
					let newInProgressTasks = items["inProgress"].slice();
					newInProgressTasks.splice(index, 1);
					setItems({ ...items, ["inProgress"]: newInProgressTasks });
					break;
				case "Complete":
					let newCompleteTasks = items["complete"].slice();
					newCompleteTasks.splice(index, 1);
					setItems({ ...items, ["complete"]: newCompleteTasks });
					break;
			}
			toast.success("Subtask Removed");
		}
	};

	useEffect(() => {
		updateSubtasksMutation.mutate({
			projectId: projectId,
			taskId: taskId,
			subTasks: items,
		});
	}, [items]);

	return (
		<div>
			<Toaster />
			<DndContext
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
							handlers={{
								handleEditTask,
								handleRemoveSubtask,
								handleAdd,
							}}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<SubtaskContainer
							id='inProgress'
							items={items.inProgress}
							columnName={"In Progress"}
							handlers={{
								handleEditTask,
								handleRemoveSubtask,
								handleAdd,
							}}
						/>
					</Grid>
					<Grid item xs={12} md={4}>
						<SubtaskContainer
							id='complete'
							items={items.complete}
							columnName={"Complete"}
							handlers={{
								handleEditTask,
								handleRemoveSubtask,
								handleAdd,
							}}
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
				[activeContainer]: [...prev[activeContainer].filter((item) => item !== active.id)],
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
