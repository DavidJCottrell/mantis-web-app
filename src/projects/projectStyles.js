import { makeStyles } from "@material-ui/core/styles";

const taskTableRowStyles = makeStyles({
	root: {
		"& > *": {
			borderBottom: "unset",
		},
	},
});

export { taskTableRowStyles };
