import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";

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

import Page from "../Page";
import RequirementDialog from "./RequirementDialog";
import * as projectApis from "../apis/project";
import * as requirementApis from "../apis/requirement";

const Requirements = () => {
	const { projectId } = useParams();

	const [requirementAnchor, setRequirementAnchor] = useState(); //State
	const handleRequirementOpen = (event) => setRequirementAnchor(event.currentTarget); //Handle open
	const handleRequirementClose = () => setRequirementAnchor(null); //Handle close
	const isRequirementOpen = Boolean(requirementAnchor); //Is open

	const [currentRequirement, setCurrentRequirement] = useState(null); //State

	const queryClient = new useQueryClient();

	const { data: roleData, isSuccess: roleSuccess } = useQuery("fetchProjectRole", () =>
		projectApis.getRole(projectId, localStorage.getItem("userId"))
	);

	const { data: requirementsData } = useQuery("fetchProjectRequirements", () =>
		requirementApis.getRequirements(projectId)
	);

	const requirementMutation = useMutation(
		({ projectId, requirementIndex }) =>
			requirementApis.removeRequirement(projectId, requirementIndex),
		{
			onSuccess: () => {
				queryClient.invalidateQueries("fetchProjectRequirements");
			},
		}
	);

	const handleRemove = (reqIndex) => {
		if (window.confirm("Are you sure you want to remove this requirement?")) {
			requirementMutation.mutate({
				projectId: projectId,
				requirementIndex: reqIndex,
			});
		}
	};

	return (
		<Page>
			{roleData && requirementsData ? (
				<Container>
					<h2>Requirements</h2>
					<Link to={`/project/${projectId}`} style={{ textDecoration: "none" }}>
						<Button variant='contained'>Back to project</Button>
					</Link>
					<br />
					<br />
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 450 }} size='small' aria-label='a dense table'>
							<TableHead>
								<TableRow>
									<TableCell>Requirement Index</TableCell>
									<TableCell align='left'>Requirement Type</TableCell>
									<TableCell align='left'>Requirement</TableCell>
									<TableCell align='center'>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{requirementsData.requirements.map((requirement, i) => (
									<TableRow
										key={requirement.index + "-" + i}
										sx={{
											"&:last-child td, &:last-child th": {
												border: 0,
											},
										}}
									>
										<TableCell component='th' scope='row'>
											{requirement.index}
										</TableCell>
										<TableCell align='left'>{requirement.type}</TableCell>
										<TableCell align='left'>{requirement.fullText}</TableCell>
										{roleData.role === "Team Leader" ? (
											<TableCell align='center'>
												<Button
													onClick={(event) => {
														setCurrentRequirement(
															requirementsData.requirements[i]
														);
														handleRequirementOpen(event);
													}}
												>
													Edit
												</Button>
												<Button
													onClick={() => {
														handleRemove(requirement.index);
													}}
													color='warning'
												>
													Remove
												</Button>
											</TableCell>
										) : null}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
					<br />
					{roleData.role === "Team Leader" ? (
						<Button
							variant='outlined'
							onClick={(event) => {
								setCurrentRequirement(null);
								handleRequirementOpen(event);
							}}
						>
							+ Add Requirement
						</Button>
					) : null}
					<RequirementDialog
						open={isRequirementOpen}
						handleClose={handleRequirementClose}
						requirement={currentRequirement}
						projectId={projectId}
						totalRequirements={requirementsData.requirements.length}
					/>
				</Container>
			) : (
				<h1>Loading requirements...</h1>
			)}
		</Page>
	);
};

export default Requirements;
