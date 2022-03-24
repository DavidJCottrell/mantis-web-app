import React from "react";

import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const Loading = () => {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div style={{ textAlign: "center" }}>
				<Typography variant='h4'>Loading...</Typography>
				<CircularProgress />
			</div>
		</div>
	);
};

export default Loading;
