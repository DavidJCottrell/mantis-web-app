import React from "react";
import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupIcon from "@mui/icons-material/Group";
import Divider from "@mui/material/Divider";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@mui/material/styles";

const UserOptions = ({
	userType,
	handleAddUserOpen,
	handleAddTaskOpen,
	handleManageTeamOpen,
	handleSettingsOpen,
	projectId,
}) => {
	const theme = useTheme();

	return (
		<React.Fragment>
			<List>
				<Link
					to={"/project/requirements"}
					state={{
						projectId: projectId,
					}}
					style={{
						textDecoration: "none",
						color: theme.palette.text.primary,
					}}
				>
					<ListItem button>
						<ListItemIcon>
							<FormatListBulletedIcon />
						</ListItemIcon>
						<ListItemText primary='Requirements' />
					</ListItem>
				</Link>

				<ListItem button>
					<ListItemIcon>
						<AssessmentIcon />
					</ListItemIcon>
					<ListItemText primary='Release report' />
				</ListItem>

				<div onClick={handleManageTeamOpen}>
					<ListItem button>
						<ListItemIcon>
							<GroupIcon />
						</ListItemIcon>
						<ListItemText primary='Team members' />
					</ListItem>
				</div>
			</List>
			<Divider />
			{userType === "Team Leader" ? (
				<List>
					<div onClick={handleAddTaskOpen}>
						<ListItem button>
							<ListItemIcon>
								<AddIcon />
							</ListItemIcon>
							<ListItemText primary='Create task' />
						</ListItem>
					</div>

					<div onClick={handleAddUserOpen}>
						<ListItem button>
							<ListItemIcon>
								<GroupAddIcon />
							</ListItemIcon>

							<ListItemText primary='Invite user' />
						</ListItem>
					</div>
					<div onClick={handleSettingsOpen}>
						<ListItem button>
							<ListItemIcon>
								<SettingsIcon />
							</ListItemIcon>
							<ListItemText primary='Project settings' />
						</ListItem>
					</div>
				</List>
			) : null}
			{userType === "Developer" ? (
				<List>
					<ListItem button>
						<ListItemIcon>
							<AddIcon />
						</ListItemIcon>
						<ListItemText primary='Suggest task' />
					</ListItem>
				</List>
			) : null}
			{userType === "Client" ? (
				<List>
					<ListItem button>
						<ListItemIcon>
							<AddIcon />
						</ListItemIcon>
						<ListItemText primary='Suggest task' />
					</ListItem>
				</List>
			) : null}
		</React.Fragment>
	);
};

export default UserOptions;
