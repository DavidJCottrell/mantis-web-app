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
import DoneIcon from "@mui/icons-material/Done";

import * as styles from "./taskStyles";

const LifecycleBar = ({ status, isMobile }) => {
	return (
		<Box>
			<List component={Stack} direction='row' style={styles.listStyle}>
				<ListItem disablePadding style={styles.listItemStyle}>
					<div style={status !== "In Development" ? styles.inactiveStyle : null}>
						<CodeIcon />
						{!isMobile ? (
							<React.Fragment>
								<br />
								In Development
							</React.Fragment>
						) : null}
					</div>
				</ListItem>
				<ListItem disablePadding style={styles.listItemStyle}>
					<div style={status !== "Testing" ? styles.inactiveStyle : null}>
						<BugReportIcon />
						<br />
						{!isMobile ? "Testing" : null}
					</div>
				</ListItem>
				<ListItem disablePadding style={styles.listItemStyle}>
					<div style={status !== "In Review" ? styles.inactiveStyle : null}>
						<VisibilityIcon />
						<br />
						{!isMobile ? "In Review" : null}
					</div>
				</ListItem>
				<ListItem disablePadding style={styles.listItemStyle}>
					<div style={status !== "Ready to Merge" ? styles.inactiveStyle : null}>
						<MergeIcon />
						<br />
						{!isMobile ? "Ready to Merge" : null}
					</div>
				</ListItem>
				<ListItem disablePadding style={styles.listItemStyle}>
					<div style={status !== "Resolved" ? styles.inactiveStyle : null}>
						<DoneIcon />
						<br />
						{!isMobile ? "Resolved" : null}
					</div>
				</ListItem>
			</List>
		</Box>
	);
};

export default LifecycleBar;
