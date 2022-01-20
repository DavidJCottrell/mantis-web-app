import { makeStyles } from "@mui/styles";

const taskTableRowStyles = makeStyles({
	root: {
		"& > *": {
			borderBottom: "unset",
		},
	},
});

export { taskTableRowStyles };
