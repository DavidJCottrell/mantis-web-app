import React from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Hidden from "@mui/material/Hidden";

const TeamMembersCard = ({ projectQuery, invitationQuery }) => {
	return (
		<Hidden only={["xs", "sm"]}>
			<Grid item xs={12} md={3}>
				<br />
				<Card>
					<CardContent>
						<Typography variant='h5' component='h2' gutterBottom>
							Team Members
						</Typography>

						{projectQuery.data.project.users?.map((user, i) => (
							<React.Fragment key={i}>
								<Typography variant='subtitle1' component='h2'>
									{user.role + "s"}
								</Typography>
								<ul>
									<li key={i}>
										{user.name + " (" + user.username + ")"}
									</li>
								</ul>
							</React.Fragment>
						))}

						<Typography variant='subtitle1' component='h2'>
							Invited
						</Typography>

						<ul>
							{invitationQuery.data.invitations?.map((invitation, i) => (
								<li key={i}>
									{invitation.invitee.name +
										" (" +
										invitation.invitee.username +
										") - " +
										invitation.role}
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			</Grid>
		</Hidden>
	);
};

export default TeamMembersCard;
