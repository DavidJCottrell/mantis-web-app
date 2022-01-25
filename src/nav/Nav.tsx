import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useQuery } from "react-query";

//Material-UI Components
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

import { NavStyles } from "./navStyles";
import { commentsData } from "../testData";

import TopBar from "./TopBar";
import ProjectDrawer from "./ProjectDrawer";

import * as userApis from "../apis/user";

const drawerWidth = 240;

const Nav = ({
	userType,
	showDrawer,
	children,
	showAddProject,
	handleAddProjectOpen,
	handleAddUserOpen,
	handleAddTaskOpen,
	handleManageTeamOpen,
	// project settings callback
}) => {
	const classes = NavStyles();
	const theme = useTheme();

	//Drawer Logic
	const [drawerOpen, setDrawerOpen] = useState(false); //State
	const handleDrawerOpen = () => setDrawerOpen(true); //Handle open
	const handleDrawerClose = () => setDrawerOpen(false); //Handle close

	const taskQuery = useQuery("fetchUsersTasks", userApis.getTasks);

	const invitationQuery = useQuery("fetchUsersInvitations", userApis.getInvitations);

	//Get Task and Comment Data
	const [taggedComments, setTaggedComments] = useState(false);
	useEffect(() => {
		setTaggedComments(commentsData);
	}, []);

	return (
		<Box sx={{ display: "flex" }}>
			{/* Standard top bar */}
			<TopBar
				drawerOpen={drawerOpen}
				showDrawer={showDrawer}
				handleDrawerOpen={handleDrawerOpen}
				classes={classes}
				invitationQuery={invitationQuery}
				taggedComments={taggedComments}
				taskQuery={taskQuery}
			/>
			{/* Drawer and content for project */}
			{showDrawer ? (
				<ProjectDrawer
					drawerOpen={drawerOpen}
					classes={classes}
					userType={userType}
					handleDrawerClose={handleDrawerClose}
					handleAddUserOpen={handleAddUserOpen}
					handleAddTaskOpen={handleAddTaskOpen}
					handleManageTeamOpen={handleManageTeamOpen}
					children={children}
				/>
			) : null}

			<Toolbar style={{ marginBottom: "20px" }} />
		</Box>
	);
};

enum UserTypes {
	"Team Leader",
	"Client",
	"Developer",
}

interface Props {
	showDrawer: Boolean;
	userType: UserTypes;
}

// Nav.propTypes = {
// 	showDrawer: PropTypes.bool,
// 	userType: PropTypes.oneOf(["Team Leader", "Client", "Developer"]),
// };

export default Nav;
