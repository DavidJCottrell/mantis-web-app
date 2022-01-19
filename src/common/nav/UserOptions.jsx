import React from "react";

import { Link } from "react-router-dom";

import AddIcon from "@material-ui/icons/Add";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import GroupIcon from "@material-ui/icons/Group";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SettingsIcon from "@material-ui/icons/Settings";

const UserOptions = ({ userType, handleAddUserOpen, handleAddTaskOpen }) => {
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
					<ListItem button>
						<ListItemIcon>
							<FormatListBulletedIcon />
						</ListItemIcon>
						<ListItemText primary='Requirements' />
					</ListItem>

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

					<ListItem button>
						<Link
							to={{
								pathname: "/",
							}}
							style={{
								textDecoration: "none",
							}}
						>
							<ListItemIcon>
								<ArrowBackIcon />
							</ListItemIcon>
						</Link>
						<ListItemText primary='Back to Dashboard' />
					</ListItem>
				</List>
			);
		default:
			return <div></div>;
	}
};

export default UserOptions;
