import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

//Material-UI Components
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

import { NavStyles } from "./navStyles";

import TopBar from "./TopBar";
import ProjectDrawer from "./ProjectDrawer";

import * as userApis from "../apis/user";

const drawerWidth = 240;

const Nav = ({ userType, showDrawer, children, projectCallbacks, projectId }) => {
	const classes = NavStyles();

	//Drawer Logic
	const [drawerOpen, setDrawerOpen] = useState(false); //State
	const handleDrawerOpen = () => setDrawerOpen(true); //Handle open
	const handleDrawerClose = () => setDrawerOpen(false); //Handle close

	const taskQuery = useQuery("fetchUsersTasks", userApis.getTasks);

	const invitationQuery = useQuery("fetchUsersInvitations", userApis.getInvitations);

	return (
		<Box sx={{ display: "flex" }}>
			{/* Standard top bar */}
			<TopBar
				drawerOpen={drawerOpen}
				showDrawer={showDrawer}
				handleDrawerOpen={handleDrawerOpen}
				classes={classes}
				invitationQuery={invitationQuery}
				// taggedComments={taggedComments}
				taskQuery={taskQuery}
			/>
			{/* Drawer and content for project */}
			{showDrawer ? (
				<ProjectDrawer
					drawerOpen={drawerOpen}
					classes={classes}
					userType={userType}
					handleDrawerClose={handleDrawerClose}
					projectCallbacks={projectCallbacks}
					children={children}
					projectId={projectId}
				/>
			) : null}

			<Toolbar style={{ marginBottom: "20px" }} />
		</Box>
	);
};

export default Nav;
