import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Complex from "./Complex";

const RequirementForm = ({ reqType }) => {
	const [preconditions, setPreconditions] = useState(1);
	const [systemResponses, setSystemResponses] = useState(1);
	const [complexKeywords, setComplexKeywords] = useState(1);

	const [complexComponents, setComplexComponents] = useState([]);

	const preconditionsEl = (
		<React.Fragment>
			{[...Array(preconditions)].map((e, i) => (
				<TextField
					key={i}
					id='outlined-basic'
					label='precondition'
					variant='outlined'
				/>
			))}

			<IconButton
				aria-label='add'
				onClick={() => {
					setPreconditions(preconditions + 1);
				}}
			>
				<AddIcon />
			</IconButton>
			<IconButton
				aria-label='add'
				onClick={() => {
					if (preconditions > 1) setPreconditions(preconditions - 1);
				}}
			>
				<RemoveIcon />
			</IconButton>
		</React.Fragment>
	);

	const systemResponsesEl = (
		<React.Fragment>
			{[...Array(systemResponses)].map((e, i) => (
				<TextField
					key={i}
					id='outlined-basic'
					label='system response'
					variant='outlined'
				/>
			))}

			<IconButton
				aria-label='add'
				onClick={() => {
					setSystemResponses(systemResponses + 1);
				}}
			>
				<AddIcon />
			</IconButton>
			<IconButton
				aria-label='add'
				onClick={() => {
					if (systemResponses > 1) setSystemResponses(systemResponses - 1);
				}}
			>
				<RemoveIcon />
			</IconButton>
		</React.Fragment>
	);

	// let complexComponents = [];

	const keywordSelectorEl = (
		<React.Fragment>
			{[...Array(complexKeywords)].map((e, i) => (
				<FormControl sx={{ minWidth: "100px" }} key={i}>
					<InputLabel>Keyword</InputLabel>
					<Select id='type-select' required label='Type' defaultValue={""}>
						<MenuItem
							value={"State Driven"}
							onClick={() => {
								setComplexComponents((complexComponents) => [
									...complexComponents,
									<React.Fragment>
										<p>While the</p>
										{preconditionsEl}
									</React.Fragment>,
								]);
							}}
						>
							State ("While")
						</MenuItem>
						<MenuItem
							value={"Event Driven"}
							onClick={() => {
								setComplexComponents((complexComponents) => [
									...complexComponents,
									<React.Fragment>
										<p>When</p>
										<TextField
											id='outlined-basic'
											label='Trigger'
											variant='outlined'
										/>
									</React.Fragment>,
								]);
							}}
						>
							Event ("When")
						</MenuItem>
						<MenuItem
							value={"Optional Feature"}
							onClick={() => {
								setComplexComponents((complexComponents) => [
									...complexComponents,
									<React.Fragment>
										<p>Where</p>
										<TextField
											id='outlined-basic'
											label='Feature is Included'
											variant='outlined'
										/>
									</React.Fragment>,
								]);
							}}
						>
							Optional ("Where")
						</MenuItem>
						<MenuItem
							value={"Unwanted Behaviour"}
							onClick={() => {
								setComplexComponents((complexComponents) => [
									...complexComponents,
									<React.Fragment>
										<p>If</p>
										<TextField
											id='outlined-basic'
											label='Trigger'
											variant='outlined'
										/>
										<p>then the</p>
										<TextField
											id='outlined-basic'
											label='System Name'
											variant='outlined'
											required
										/>
									</React.Fragment>,
								]);
							}}
						>
							Unwanted ("If Then")
						</MenuItem>
					</Select>
				</FormControl>
			))}

			<IconButton
				aria-label='add'
				onClick={() => {
					setComplexKeywords(complexKeywords + 1);
				}}
			>
				<AddIcon />
			</IconButton>
			<IconButton
				aria-label='add'
				onClick={() => {
					if (complexKeywords > 1) setComplexKeywords(complexKeywords - 1);
				}}
			>
				<RemoveIcon />
			</IconButton>
		</React.Fragment>
	);

	let form = null;
	switch (reqType) {
		case "Ubiquitous":
			form = (
				<React.Fragment>
					<p>The</p>
					<TextField
						id='outlined-basic'
						label='System Name'
						variant='outlined'
					/>

					<p>shall</p>
					{systemResponsesEl}
				</React.Fragment>
			);
			break;
		case "State Driven":
			form = (
				<React.Fragment>
					<p>While the</p>
					{preconditionsEl}

					<p>, the</p>
					<TextField
						id='outlined-basic'
						label='system name'
						variant='outlined'
					/>

					<p>shall</p>
					{systemResponsesEl}
				</React.Fragment>
			);
			break;
		case "Event Driven":
			form = (
				<React.Fragment>
					<p>When</p>
					<TextField id='outlined-basic' label='Trigger' variant='outlined' />
					<p>, the</p>
					<TextField
						id='outlined-basic'
						label='System Name'
						variant='outlined'
					/>
					<p>shall</p>
					{systemResponsesEl}
				</React.Fragment>
			);
			break;
		case "Optional Feature":
			form = (
				<React.Fragment>
					<p>Where</p>
					<TextField
						id='outlined-basic'
						label='Feature is Included'
						variant='outlined'
					/>
					<p>, the</p>
					<TextField
						id='outlined-basic'
						label='System Name'
						variant='outlined'
					/>
					<p>shall</p>
					{systemResponsesEl}
				</React.Fragment>
			);
			break;
		case "Unwanted Behaviour":
			form = (
				<React.Fragment>
					<p>If</p>
					<TextField id='outlined-basic' label='Trigger' variant='outlined' />
					<p>then the</p>
					<TextField
						id='outlined-basic'
						label='System Name'
						variant='outlined'
						required
					/>
					<p>shall</p>
					{systemResponsesEl}
				</React.Fragment>
			);
			break;
		case "Complex":
			form = (
				<React.Fragment>
					{keywordSelectorEl}
					{complexComponents.map((el, i) => (
						<React.Fragment key={i}>{el}</React.Fragment>
					))}
				</React.Fragment>
			);
			break;
	}

	return reqType ? <React.Fragment>{form}</React.Fragment> : null;
};

export default RequirementForm;
