// MUI
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// MUI Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { DrawerHeader, Drawer } from "./drawerStyles";
import UserOptions from "./DrawerUserOptions";

const ProjectDrawer = ({
	drawerOpen,
	handleDrawerClose,
	theme,
	role,
	projectId,
	dialogCallbacks,
	classes,
}) => {
	return (
		<Drawer variant='permanent' drawerOpen={drawerOpen}>
			<DrawerHeader>
				<Typography
					className={classes.grow}
					variant='body1'
					style={{ paddingLeft: "10px" }}
				>
					{role}
				</Typography>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<UserOptions userType={role} projectId={projectId} dialogCallbacks={dialogCallbacks} />
		</Drawer>
	);
};

export default ProjectDrawer;
