import React, { useState } from "react";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import Nav from "../nav/Nav";
import RequirementDialog from "./RequirementDialog";

function createData(reqIndex, reqType, content) {
	reqIndex = "REQ-" + reqIndex;
	return { reqIndex, reqType, content };
}

const rows = [
	createData(
		"1",
		"State Driven",
		"While there is no card in the ATM, the ATM shall display “insert card to begin”"
	),
	createData(
		"2",
		"State Driven",
		"While there is no card in the ATM, the ATM shall display “insert card to begin”"
	),
	createData(
		"3",
		"State Driven",
		"While there is no card in the ATM, the ATM shall display “insert card to begin”"
	),
];

const Requirements = (props) => {
	const [requirementAnchor, setRequirementAnchor] = useState(); //State
	const handleRequirementOpen = (event) => setRequirementAnchor(event.currentTarget); //Handle open
	const handleRequirementClose = () => setRequirementAnchor(null); //Handle close
	const isRequirementOpen = Boolean(requirementAnchor); //Is open

	const [currentRequirement, setCurrentRequirement] = useState(null); //State

	const handleEdit = (reqIndex) => {
		setCurrentRequirement(rows[reqIndex]);
	};

	const handleRemove = (reqIndex) => {
		console.log("Remove ", reqIndex);
	};

	return (
		<React.Fragment>
			<Nav />
			<Container>
				<h2>Requirements</h2>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
						<TableHead>
							<TableRow>
								<TableCell>Requirement Index</TableCell>
								<TableCell align='left'>Requirement Type</TableCell>
								<TableCell align='left'>Requirement</TableCell>
								<TableCell align='center'>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row, i) => (
								<TableRow
									key={row.reqIndex}
									sx={{
										"&:last-child td, &:last-child th": { border: 0 },
									}}
								>
									<TableCell component='th' scope='row'>
										{row.reqIndex}
									</TableCell>
									<TableCell align='left'>{row.reqType}</TableCell>
									<TableCell align='left'>{row.content}</TableCell>
									<TableCell align='center'>
										<Button
											onClick={(event) => {
												handleEdit(i);
												handleRequirementOpen(event);
											}}
										>
											Edit
										</Button>
										<Button
											onClick={(event) => {
												handleRemove(i);
											}}
											color='warning'
										>
											Remove
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<br />
				<Button variant='outlined' onClick={handleRequirementOpen}>
					+ Add Requirement
				</Button>
			</Container>
			<RequirementDialog
				open={isRequirementOpen}
				handleClose={handleRequirementClose}
				requirement={currentRequirement}
			/>
		</React.Fragment>
	);
};

export default Requirements;
