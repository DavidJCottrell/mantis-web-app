import React from "react";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Complex = ({ children }) => {
	return (
		<React.Fragment>
			<FormControl sx={{ minWidth: "100px" }}>
				<InputLabel>Type</InputLabel>
				<Select id='type-select' required label='Type' defaultValue={""}>
					<MenuItem value={"State Driven"}>State ("While")</MenuItem>
					<MenuItem value={"Event Driven"}>Event ("When")</MenuItem>
					<MenuItem value={"Optional Feature"}>Optional ("Where")</MenuItem>
					<MenuItem value={"Unwanted Behaviour"}>Unwanted ("If Then")</MenuItem>
				</Select>
			</FormControl>
		</React.Fragment>
	);
};

export default Complex;
