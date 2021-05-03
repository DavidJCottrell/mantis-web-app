import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";

// Material-UI
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

// import auth from "../utils/auth";
import ProfileDialog from "./ProfileDialog";

const ProfileMenu = (props) => {
	const signOut = () => {
		// props.auth.logout(() => {
		// 	console.log("Log Out");
		// });
	};

	const [profileOpen, setProfileOpen] = useState(false);

	const handleProfileOpen = () => {
		setProfileOpen(true);
	};

	const handleProfileClose = () => {
		setProfileOpen(false);
	};

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
					<MenuItem onClick={props.handleClose}>Dashboard</MenuItem>
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
					<MenuItem onClick={signOut}>Sign Out</MenuItem>
				</Link>
			</Menu>
			<ProfileDialog handleClose={handleProfileClose} open={profileOpen} />
		</React.Fragment>
	);
};

export default withRouter(ProfileMenu);
