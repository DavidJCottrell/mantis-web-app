import React, { useState } from "react";
import { useQuery } from "react-query";

//Material-UI Components
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

import TopBar from "./TopBar";
import ProjectDrawer from "./ProjectDrawer";

import * as userApis from "../apis/user";
import { NavStyles } from "./navStyles";

const Nav = ({ userType, showDrawer, children, dialogCallbacks, projectId }) => {
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
				taskQuery={taskQuery}
			/>
			{/* Drawer and content for project */}
			{showDrawer ? (
				<ProjectDrawer
					drawerOpen={drawerOpen}
					classes={classes}
					userType={userType}
					handleDrawerClose={handleDrawerClose}
					dialogCallbacks={dialogCallbacks}
					children={children}
					projectId={projectId}
				/>
			) : null}

			<Toolbar style={{ marginBottom: "20px" }} />
		</Box>
	);
};

export default Nav;
