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
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@mui/material/styles";

const UserOptions = ({ userType, handleAddUserOpen, handleAddTaskOpen }) => {
	const theme = useTheme();
	switch (userType) {
		case "Team Leader":
			return (
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

					<ListItem button>
						<ListItemIcon>
							<SettingsIcon />
						</ListItemIcon>
						<ListItemText primary='Project settings' />
					</ListItem>
				</List>
			);
		case "Developer":
			return (
				<List>
					<ListItem button>
						<ListItemIcon>
							<AddIcon />
						</ListItemIcon>
						<ListItemText primary='Suggest task' />
					</ListItem>
				</List>
			);
		case "Client":
			return (
				<List>
					<ListItem button>
						<ListItemIcon>
							<AddIcon />
						</ListItemIcon>
						<ListItemText primary='Suggest task' />
					</ListItem>
				</List>
			);
		case "All":
			return (
				<List>
					<Link
						to={"/project/requirements"}
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

					<ListItem button>
						<ListItemIcon>
							<GroupIcon />
						</ListItemIcon>
						<ListItemText primary='Team members' />
					</ListItem>
				</List>
			);
		default:
			return <div></div>;
	}
};

export default UserOptions;
