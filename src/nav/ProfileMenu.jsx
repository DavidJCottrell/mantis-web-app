import React, { useState } from "react";
import { Link } from "react-router-dom";

// Material-UI
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import auth from "../auth";

import ProfileDialog from "./ProfileDialog";

const ProfileMenu = (props) => {
	const [profileOpen, setProfileOpen] = useState(false);
	const handleProfileOpen = () => setProfileOpen(true);
	const handleProfileClose = () => setProfileOpen(false);

	return (
		<React.Fragment>
			<Menu
				anchorEl={props.anchorElement}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				keepMounted
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				open={props.open}
				onClose={props.handleClose}
			>
				<Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
					<MenuItem onClick={props.handleClose}>My dashboard</MenuItem>
				</Link>
				<MenuItem
					onClick={() => {
						props.handleClose();
						handleProfileOpen();
					}}
				>
					My account
				</MenuItem>
				<Link to='/login' style={{ textDecoration: "none", color: "inherit" }}>
					<MenuItem onClick={auth.logout}>Sign Out</MenuItem>
				</Link>
			</Menu>
			<ProfileDialog handleClose={handleProfileClose} open={profileOpen} />
		</React.Fragment>
	);
};

export default ProfileMenu;
