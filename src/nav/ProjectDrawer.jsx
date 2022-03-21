import React from "react";

// MUI
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

// MUI Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { DrawerHeader, Drawer } from "./navStyles";
import UserOptions from "./DrawerUserOptions";

const ProjectDrawer = ({
	drawerOpen,
	classes,
	userType,
	handleDrawerClose,
	dialogCallbacks,
	children,
	projectId,
}) => {
	const theme = useTheme();

	return (
		<React.Fragment>
			<Drawer variant='permanent' drawerOpen={drawerOpen}>
				<DrawerHeader>
					<Typography
						className={classes.grow}
						variant='body1'
						style={{ paddingLeft: "10px" }}
					>
						{userType}
					</Typography>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<UserOptions
					userType={userType}
					projectId={projectId}
					dialogCallbacks={dialogCallbacks}
				/>
			</Drawer>
			{/* Main content of page */}
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{children}
			</main>
		</React.Fragment>
	);
};

export default ProjectDrawer;
