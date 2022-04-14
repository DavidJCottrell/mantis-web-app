import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Grid from "@mui/material/Grid";
import SubtaskContainer from "./SubtaskContainer";
import { Item } from "./SubtaskItem";
import * as tasksApis from "../../apis/tasks";
import toast from "react-hot-toast";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import {
	DndContext,
	DragOverlay,
	closestCorners,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";

// Credit - https://codesandbox.io/s/lknfe

const Subtasks = ({ projectId, taskId, subtaskData, currentUserIsAssigned }) => {
	const [subtasks, setSubtasks] = useState(subtaskData);
	const [activeId, setActiveId] = useState();

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const queryClient = new useQueryClient();

	const updateSubtasksMutation = useMutation(
		({ projectId, taskId, subTasks }) => tasksApis.updateSubtasks(projectId, taskId, subTasks),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("fetchSubTasks");
			},
		}
	);

	const update = (newTasks) => {
		setSubtasks(newTasks);
		updateSubtasksMutation.mutate({
			projectId: projectId,
			taskId: taskId,
			subTasks: newTasks,
		});
	};

	const parseColumnName = (columnName) => {
		switch (columnName) {
			case "To Do":
				return "toDo";
			case "In Progress":
				return "inProgress";
			case "Complete":
				return "complete";
		}
	};

	const handleAdd = (columnName) => {
		const newText = prompt("Subtask:");
		const parsedColumnName = parseColumnName(columnName);

		if (newText !== null) {
			if (newText.length != 0) {
				let newTasks = subtasks[parsedColumnName].slice();
				newTasks.push(newText);
				update({ ...subtasks, [parsedColumnName]: newTasks });
				toast.success("Subtask Added");
			}
		}
	};

	const handleEditTask = (index, columnName) => {
		let parsedColumnName = parseColumnName(columnName);
		let newTasks = subtasks[parsedColumnName].slice();
		let newText = prompt("Subtask:", subtasks[parsedColumnName][index]);

		if (newText !== null) {
			if (newText.length !== 0) {
				newTasks[index] = newText;
				update({ ...subtasks, [parsedColumnName]: newTasks });
			}
		}
	};

	const handleRemoveSubtask = (index, columnName) => {
		if (confirm("Are you sure you want to delete this subtask?")) {
			let parsedColumnName = parseColumnName(columnName);
			let newTasks = subtasks[parsedColumnName].slice();
			newTasks.splice(index, 1);
			update({ ...subtasks, [parsedColumnName]: newTasks });
			toast.success("Subtask Removed");
		}
	};

	const announcements = {
		onDragStart(id) {},
		onDragOver(id, overId) {},
		onDragEnd(id, overId) {
			if (overId) {
				updateSubtasksMutation.mutate({
					projectId: projectId,
					taskId: taskId,
					subTasks: subtasks,
				});
				return;
			}
		},
		onDragCancel(id) {},
	};

	return (
		<React.Fragment>
			{subtasks ? (
				<div>
					<DndContext
						sensors={sensors}
						collisionDetection={closestCorners}
						onDragStart={handleDragStart}
						onDragOver={handleDragOver}
						onDragEnd={handleDragEnd}
						announcements={announcements}
					>
						<Grid container spacing={5}>
							<Grid item xs={12} md={4}>
								<SubtaskContainer
									id='toDo'
									items={subtasks.toDo}
									columnName={"To Do"}
									currentUserIsAssigned={currentUserIsAssigned}
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
									items={subtasks.inProgress}
									columnName={"In Progress"}
									currentUserIsAssigned={currentUserIsAssigned}
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
									items={subtasks.complete}
									columnName={"Complete"}
									currentUserIsAssigned={currentUserIsAssigned}
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
			) : null}
		</React.Fragment>
	);

	function findContainer(id) {
		if (id in subtasks) return id;
		return Object.keys(subtasks).find((key) => subtasks[key].includes(id));
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

		if (!activeContainer || !overContainer || activeContainer === overContainer) return;

		setSubtasks((prev) => {
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
					...prev[activeContainer].filter((subtask) => subtask !== active.id),
				],
				[overContainer]: [
					...prev[overContainer].slice(0, newIndex),
					subtasks[activeContainer][activeIndex],
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

		if (!activeContainer || !overContainer || activeContainer !== overContainer) return;

		const activeIndex = subtasks[activeContainer].indexOf(active.id);
		const overIndex = subtasks[overContainer].indexOf(overId);

		if (activeIndex !== overIndex) {
			const newSubtasks = {
				...subtasks,
				[overContainer]: arrayMove(subtasks[overContainer], activeIndex, overIndex),
			};
			update(newSubtasks);
		}

		setActiveId(null);
	}
};

export default Subtasks;
