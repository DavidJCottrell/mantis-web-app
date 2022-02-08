import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

// Material-UI
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

import IconButton from "@mui/material/IconButton";

// Icons
import CodeIcon from "@mui/icons-material/Code";
import BugReportIcon from "@mui/icons-material/BugReport";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MergeIcon from "@mui/icons-material/Merge";

const LifecycleBar = () => {
	const listItemStyle = { textAlign: "center", justifyContent: "center" };

	return (
		<Box>
			<List component={Stack} direction='row'>
				<ListItem disablePadding style={listItemStyle}>
					<div>
						<CodeIcon />
						<br />
						In Development
					</div>
				</ListItem>
				<ListItem disablePadding style={listItemStyle}>
					<div>
						<BugReportIcon />
						<br />
						Testing
					</div>
				</ListItem>
				<ListItem disablePadding style={listItemStyle}>
					<div>
						<VisibilityIcon />
						<br />
						In Review
					</div>
				</ListItem>
				<ListItem disablePadding style={listItemStyle}>
					<div>
						<MergeIcon />
						<br />
						Ready to Merge
					</div>
				</ListItem>
			</List>
		</Box>
	);
};

export default LifecycleBar;
