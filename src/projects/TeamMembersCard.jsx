import React from "react";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const TeamMembersCard = ({ members, invitations }) => {
	let teamLeaders = [];
	let developers = [];
	let clients = [];

	for (const user of members) {
		if (user.role === "Team Leader") teamLeaders.push(user);
		else if (user.role === "Developer") developers.push(user);
		else clients.push(user);
	}

	return (
		<Card>
			<CardContent>
				<Typography variant='h5' component='h2' gutterBottom>
					Team Members
				</Typography>
				<Typography variant='subtitle1' component='h2'>
					Team Leaders
				</Typography>
				<ul>
					{teamLeaders.map((leader, i) => (
						<li key={i}>{leader.name + " (" + leader.username + ")"}</li>
					))}
				</ul>

				<Typography variant='subtitle1' component='h2'>
					Developers
				</Typography>
				<ul>
					{developers.map((developer, i) => (
						<li key={i}>{developer.name + " (" + developer.username + ")"}</li>
					))}
				</ul>

				{clients.length > 0 ? (
					<React.Fragment>
						<Typography variant='subtitle1' component='h2'>
							Clients
						</Typography>
						<ul>
							{clients.map((client, i) => (
								<li key={i}>{client.name + " (" + client.username + ")"}</li>
							))}
						</ul>
					</React.Fragment>
				) : null}

				{invitations.length > 0 ? (
					<React.Fragment>
						<Typography variant='subtitle1' component='h2'>
							Invited
						</Typography>

						<ul>
							{invitations.map((invitation, i) => (
								<li key={i}>
									{invitation.invitee.name +
										" (" +
										invitation.invitee.username +
										") - " +
										invitation.role}
								</li>
							))}
						</ul>
					</React.Fragment>
				) : null}
			</CardContent>
		</Card>
	);
};

export default TeamMembersCard;
