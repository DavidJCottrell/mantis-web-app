import React from "react";

// Material-UI styles
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

// Custom Components
import { taskTableRowStyles } from "./projectStyles";

const TaskTableRow = (props) => {
	const { isMobile, row } = props;
	const [open, setOpen] = React.useState(false);
	const classes = taskTableRowStyles();

	return (
		<React.Fragment>
			<TableRow className={classes.root}>
				<TableCell component='th' scope='row'>
					{row.taskKey}
				</TableCell>
				<TableCell align='left'>{row.title}</TableCell>
				{isMobile ? (
					<React.Fragment>
						<TableCell align='left'>{row.status}</TableCell>
						<TableCell align='left'>{row.resolution}</TableCell>
					</React.Fragment>
				) : null}
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Typography variant='body1'>Task Details</Typography>
						<Divider />
						<Box margin={2}>
							{!isMobile ? (
								<React.Fragment>
									<Typography variant='body1'>
										Status: <b>In-progress</b>
									</Typography>
									<Typography variant='body1'>
										Resolution: <b>Unresolved</b>
									</Typography>
								</React.Fragment>
							) : null}

							<Typography variant='body1'>
								Reporter: <b>Ben Swanson</b>
							</Typography>
							<Typography variant='body1'>
								Assignee: <b>John Smith</b>
							</Typography>
							<Typography variant='body1'>
								Created: <b>01/02/21</b>
							</Typography>
							<Typography variant='body1'>
								Updated: <b>23/05/21</b>
							</Typography>
							<Typography variant='body1'>
								Due: <b>12/08/21</b>
							</Typography>
							<br />
							<Button variant='contained' color='secondary'>
								Open task
							</Button>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
};

export default TaskTableRow;
